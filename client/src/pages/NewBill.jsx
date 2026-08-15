import React, { useMemo, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomerSelector from "../components/dashboard/newBill/CustomerSelector";
import ProductSelector from "../components/dashboard/newBill/ProductSelector";
import BillItemsTable from "../components/dashboard/newBill/BillItemsTable";
import BillSummary from "../components/dashboard/newBill/BillSummary";
import PaymentSection from "../components/dashboard/newBill/PaymentSection";
import BillActions from "../components/dashboard/newBill/BillActions";

const NewBill = () => {
  const navigate = useNavigate();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [billItems, setBillItems] = useState([]);
  const [taxRate, setTaxRate] = useState(5);
  const [billDiscount, setBillDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [amountReceived, setAmountReceived] = useState("");

  const handleAddProduct = (product) => {
    setBillItems((currentItems) => {
      const existingProduct = currentItems.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
          discount: 0,
        },
      ];
    });
  };

  const handleIncrease = (id) => {
    setBillItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.stock),
            }
          : item,
      ),
    );
  };

  const handleDecrease = (id) => {
    setBillItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemove = (id) => {
    setBillItems((items) => items.filter((item) => item.id !== id));
  };

  const handleDiscountChange = (id, value) => {
    const discount = Math.min(100, Math.max(0, Number(value) || 0));

    setBillItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              discount,
            }
          : item,
      ),
    );
  };

  const subtotal = useMemo(() => {
    return billItems.reduce((total, item) => {
      return total + Number(item.price || 0) * Number(item.quantity || 0);
    }, 0);
  }, [billItems]);

  const itemDiscount = useMemo(() => {
    return billItems.reduce((total, item) => {
      const itemSubtotal = Number(item.price || 0) * Number(item.quantity || 0);

      return total + (itemSubtotal * Number(item.discount || 0)) / 100;
    }, 0);
  }, [billItems]);

  const billDiscountAmount = (subtotal * Number(billDiscount || 0)) / 100;

  const taxableAmount = subtotal - itemDiscount - billDiscountAmount;

  const taxAmount = (taxableAmount * Number(taxRate || 0)) / 100;

  const grandTotal = taxableAmount + taxAmount;

  const handleClearBill = () => {
    setSelectedCustomer(null);
    setBillItems([]);
    setBillDiscount(0);
    setTaxRate(5);
    setPaymentMethod("Cash");
    setAmountReceived("");
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", {
      customer: selectedCustomer,
      items: billItems,
    });
  };

  const handleGenerateBill = () => {
    if (!selectedCustomer || billItems.length === 0) {
      return;
    }

    const billId = `INV-${Date.now()}`;

    const bill = {
      id: billId,
      invoiceNumber: billId,
      date: new Date().toLocaleDateString("en-IN"),

      customer: selectedCustomer,

      items: billItems,

      subtotal,
      itemDiscount,
      billDiscount: billDiscountAmount,
      tax: taxAmount,
      total: grandTotal,

      paymentMethod,
      amountReceived: Number(amountReceived || 0),
    };

    localStorage.setItem(`bill-${billId}`, JSON.stringify(bill));

    navigate(`/billing/invoice/${billId}`);
  };

  return (
    <div className="min-h-full space-y-4 bg-background text-foreground">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between">
        {/* Left */}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-md
              border border-border
              text-secondary
              hover:bg-muted
              hover:text-foreground
            "
          >
            <ArrowLeft size={15} />
          </button>

          <div>
            <h1 className="text-base font-semibold">New Bill</h1>

            <p className="mt-0.5 text-[10px] text-secondary">
              Create a new customer bill
            </p>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="
              hidden h-8
              items-center gap-1.5
              rounded-md
              border border-border
              px-3
              text-xs
              text-secondary
              hover:bg-muted
              sm:flex
            "
          >
            <Save size={13} />
            Save Draft
          </button>

          <button
            type="button"
            disabled={!selectedCustomer}
            className="
              h-8
              rounded-md
              bg-primary
              px-3
              text-xs
              font-medium
              text-primary-foreground
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Generate Bill
          </button>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* LEFT */}

        <div className="space-y-4 xl:col-span-2">
          <CustomerSelector
            customer={selectedCustomer}
            onCustomerSelect={setSelectedCustomer}
          />

          {/* Product section will be added next */}
          <ProductSelector onAddProduct={handleAddProduct} />

          <BillItemsTable
            items={billItems}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
            onDiscountChange={handleDiscountChange}
          />
        </div>

        {/* RIGHT */}

        <div className="space-y-4">
          <BillSummary
            items={billItems}
            taxRate={taxRate}
            onTaxRateChange={setTaxRate}
            discount={billDiscount}
            onDiscountChange={setBillDiscount}
          />
          <PaymentSection
            total={grandTotal}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            amountReceived={amountReceived}
            onAmountReceivedChange={setAmountReceived}
          />
        </div>
      </div>

      <BillActions
        customer={selectedCustomer}
        items={billItems}
        onClear={handleClearBill}
        onSaveDraft={handleSaveDraft}
        onGenerateBill={handleGenerateBill}
      />
    </div>
  );
};

export default NewBill;
