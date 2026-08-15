import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Printer,
  Download,
  QrCode,
  MessageCircle,
  Receipt,
  MapPin,
  Phone,
  Check,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const InvoicePreview = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [bill, setBill] = useState(null);

  // =========================================================
  // LOAD BILL
  // =========================================================

  useEffect(() => {
    if (!id) return;

    const savedBill = localStorage.getItem(`bill-${id}`);

    console.log("Invoice ID:", id);
    console.log("Saved Bill:", savedBill);

    if (!savedBill) return;

    try {
      setBill(JSON.parse(savedBill));
    } catch (error) {
      console.error("Failed to parse invoice:", error);
    }
  }, [id]);

  // =========================================================
  // FORMAT CURRENCY
  // =========================================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // =========================================================
  // PRINT
  // =========================================================

  const handlePrint = () => {
    window.print();
  };

  // =========================================================
  // DOWNLOAD
  // =========================================================

  const handleDownload = () => {
    window.print();
  };

  // =========================================================
  // UPI
  // =========================================================

  // Replace with your real UPI ID
  const upiId = "yourupi@upi";

  const upiPaymentUrl = bill
    ? `upi://pay?pa=${encodeURIComponent(
        upiId
      )}&pn=${encodeURIComponent(
        "Smart Billing"
      )}&am=${Number(bill.total || 0).toFixed(
        2
      )}&cu=INR&tn=${encodeURIComponent(
        `Invoice ${bill.invoiceNumber}`
      )}`
    : "";

  // =========================================================
  // WHATSAPP
  // =========================================================

  const handleWhatsApp = () => {
    if (!bill) return;

    const mobile = String(
      bill.customer?.mobile || ""
    ).replace(/\D/g, "");

    if (!mobile) {
      alert(
        "Customer mobile number is not available."
      );
      return;
    }

    const whatsappNumber =
      mobile.length === 10
        ? `91${mobile}`
        : mobile;

    const message = `
Hello ${bill.customer?.name || "Customer"},

Thank you for your purchase from Smart Billing.

Invoice: ${bill.invoiceNumber}
Date: ${bill.date}

Total Amount: ${formatCurrency(
      bill.total
    )}

Payment Method: ${bill.paymentMethod}

Thank you.
    `.trim();

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (!bill) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-background">
        <div className="text-center">
          <div
            className="
              mx-auto
              flex h-10 w-10
              items-center justify-center
              rounded-md
              border border-border
              bg-card
            "
          >
            <Receipt
              size={18}
              className="text-secondary"
            />
          </div>

          <p className="mt-3 text-sm font-medium">
            No invoice data found.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/billing/new")
            }
            className="
              mt-3
              rounded-md
              border border-border
              px-3 py-1.5
              text-xs
              text-secondary
              transition-colors
              hover:bg-muted
              hover:text-foreground
            "
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // PAYMENT CALCULATIONS
  // =========================================================

  const amountReceived = Number(
    bill.amountReceived || 0
  );

  const grandTotal = Number(
    bill.total || 0
  );

  const change =
    bill.paymentMethod === "Cash"
      ? Math.max(
          amountReceived - grandTotal,
          0
        )
      : 0;

  const amountDue =
    bill.paymentMethod === "Due"
      ? grandTotal
      : Math.max(
          grandTotal - amountReceived,
          0
        );

  const isDue =
    bill.paymentMethod === "Due";

  return (
    <>
      {/* =====================================================
          PRINT STYLE
      ===================================================== */}

      <style>
        {`
          @media print {
            html,
            body {
              margin: 0 !important;
              padding: 0 !important;
              background: #ffffff !important;
            }

            body * {
              visibility: hidden;
            }

            #invoice,
            #invoice * {
              visibility: visible;
            }

            #invoice {
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);

              width: 80mm;
              max-width: 80mm;

              margin: 0 !important;
              border: none !important;
              border-radius: 0 !important;
              box-shadow: none !important;

              background: #ffffff !important;
              color: #000000 !important;
            }

            @page {
              size: 80mm auto;
              margin: 0;
            }

            .print-hidden {
              display: none !important;
            }
          }
        `}
      </style>

      {/* =====================================================
          PAGE
      ===================================================== */}

      <div className="min-h-full bg-background text-foreground">
        {/* ===================================================
            TOOLBAR
        =================================================== */}

        <div
          className="
            print-hidden
            mx-auto
            mb-4
            flex
            max-w-3xl
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* LEFT */}

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() =>
                navigate("/billing/new")
              }
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-md
                border border-border
                bg-card
                text-secondary
                transition-colors
                hover:bg-muted
                hover:text-foreground
              "
            >
              <ArrowLeft size={15} />
            </button>

            <div>
              <h1 className="text-sm font-semibold">
                Invoice Preview
              </h1>

              <p className="mt-0.5 font-mono text-[9px] text-secondary">
                {bill.invoiceNumber}
              </p>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex flex-wrap gap-1.5">
            {/* QR */}

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("payment-qr")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
              }
              className="
                inline-flex
                h-8
                items-center
                gap-1.5
                rounded-md
                border border-border
                bg-card
                px-3
                text-[10px]
                font-medium
                text-secondary
                transition-colors
                hover:bg-muted
                hover:text-foreground
              "
            >
              <QrCode size={13} />
              QR
            </button>

            {/* WHATSAPP */}

            <button
              type="button"
              onClick={handleWhatsApp}
              className="
                inline-flex
                h-8
                items-center
                gap-1.5
                rounded-md
                border border-border
                bg-card
                px-3
                text-[10px]
                font-medium
                text-secondary
                transition-colors
                hover:bg-muted
                hover:text-foreground
              "
            >
              <MessageCircle size={13} />
              WhatsApp
            </button>

            {/* DOWNLOAD */}

            <button
              type="button"
              onClick={handleDownload}
              className="
                inline-flex
                h-8
                items-center
                gap-1.5
                rounded-md
                border border-border
                bg-card
                px-3
                text-[10px]
                font-medium
                text-secondary
                transition-colors
                hover:bg-muted
                hover:text-foreground
              "
            >
              <Download size={13} />
              Download
            </button>

            {/* PRINT */}

            <button
              type="button"
              onClick={handlePrint}
              className="
                inline-flex
                h-8
                items-center
                gap-1.5
                rounded-md
                bg-primary
                px-3
                text-[10px]
                font-semibold
                text-primary-foreground
                transition-opacity
                hover:opacity-90
              "
            >
              <Printer size={13} />
              Print
            </button>
          </div>
        </div>

        {/* ===================================================
            PREMIUM TICKET
        =================================================== */}

        <div
          id="invoice"
          className="
            relative
            mx-auto
            w-full
            max-w-2xl
            overflow-hidden
            rounded-md
            border
            border-border
            bg-card
            shadow-xl
            print:max-w-none
            print:rounded-none
            print:border-0
            print:shadow-none
          "
        >
          {/* =================================================
              TOP ACCENT
          ================================================= */}

          <div className="h-1 bg-primary" />

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="px-7 pb-6 pt-7">
            <div className="flex items-start justify-between gap-6">
              {/* BRAND */}

              <div>
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-md
                      bg-primary
                      text-primary-foreground
                    "
                  >
                    <Receipt size={20} />
                  </div>

                  <div>
                    <h1 className="text-base font-bold tracking-tight">
                      Smart Billing
                    </h1>

                    <p className="mt-0.5 text-[7px] font-semibold uppercase tracking-[0.2em] text-secondary">
                      Pharmacy & Healthcare
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[8px] text-secondary">
                    <MapPin size={9} />
                    Balasore, Odisha
                  </div>

                  <div className="flex items-center gap-1.5 text-[8px] text-secondary">
                    <Phone size={9} />
                    +91 98765 43210
                  </div>
                </div>
              </div>

              {/* INVOICE */}

              <div className="text-right">
                <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-secondary">
                  Tax Invoice
                </p>

                <p className="mt-2 font-mono text-[11px] font-bold">
                  #{bill.invoiceNumber}
                </p>

                <div className="mt-2 inline-flex rounded-md bg-muted px-2.5 py-1">
                  <span className="text-[7px] font-medium text-secondary">
                    {bill.date}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              FIRST PERFORATION
          ================================================= */}

          <div className="relative flex items-center">
            <div
              className="
                absolute
                -left-4
                h-8
                w-8
                rounded-md
                bg-background
              "
            />

            <div className="mx-6 flex-1 border-t border-dashed border-border" />

            <div
              className="
                absolute
                -right-4
                h-8
                w-8
                rounded-md
                bg-background
              "
            />
          </div>

          {/* =================================================
              CUSTOMER
          ================================================= */}

          <div className="px-7 py-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-secondary">
                  Billed To
                </p>

                <h2 className="mt-1.5 text-sm font-bold">
                  {bill.customer?.name ||
                    "Walk-in Customer"}
                </h2>

                <p className="mt-0.5 text-[8px] text-secondary">
                  {bill.customer?.mobile ||
                    "No mobile number"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-secondary">
                  Status
                </p>

                <span
                  className={`
                    mt-1.5
                    inline-flex
                    items-center
                    gap-1
                    rounded-md
                    px-2.5
                    py-1
                    text-[7px]
                    font-bold
                    ${
                      isDue
                        ? "bg-red-500/10 text-red-500"
                        : "bg-green-500/10 text-green-600"
                    }
                  `}
                >
                  {!isDue && (
                    <Check size={8} />
                  )}

                  {isDue ? "DUE" : "PAID"}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <div className="px-5">
            <div className="overflow-hidden rounded-md border border-border">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="bg-muted/40">
                    <th className="w-[47%] px-4 py-3 text-left text-[7px] font-bold uppercase tracking-wider text-secondary">
                      Item
                    </th>

                    <th className="w-[12%] px-1 py-3 text-center text-[7px] font-bold uppercase tracking-wider text-secondary">
                      Qty
                    </th>

                    <th className="w-[18%] px-1 py-3 text-right text-[7px] font-bold uppercase tracking-wider text-secondary">
                      Rate
                    </th>

                    <th className="w-[23%] px-4 py-3 text-right text-[7px] font-bold uppercase tracking-wider text-secondary">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {bill.items?.map(
                    (item, index) => {
                      const subtotal =
                        Number(
                          item.price || 0
                        ) *
                        Number(
                          item.quantity || 0
                        );

                      const discount =
                        (subtotal *
                          Number(
                            item.discount || 0
                          )) /
                        100;

                      const total =
                        subtotal -
                        discount;

                      return (
                        <tr
                          key={`${item.id}-${index}`}
                          className="border-t border-border"
                        >
                          {/* ITEM */}

                          <td className="px-4 py-3">
                            <div className="flex items-start gap-2">
                              <span
                                className="
                                  flex h-5 w-5
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-md
                                  bg-muted
                                  text-[7px]
                                  font-bold
                                  text-secondary
                                "
                              >
                                {String(
                                  index + 1
                                ).padStart(
                                  2,
                                  "0"
                                )}
                              </span>

                              <div className="min-w-0">
                                <p className="truncate text-[9px] font-semibold">
                                  {item.name}
                                </p>

                                <p className="mt-0.5 truncate font-mono text-[7px] text-secondary">
                                  {item.sku}
                                </p>

                                {Number(
                                  item.discount || 0
                                ) > 0 && (
                                  <span
                                    className="
                                      mt-1
                                      inline-flex
                                      rounded-md
                                      bg-red-500/10
                                      px-1.5
                                      py-0.5
                                      text-[6px]
                                      font-semibold
                                      text-red-500
                                    "
                                  >
                                    {item.discount}% OFF
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* QTY */}

                          <td className="px-1 py-3 text-center text-[9px] font-medium">
                            {item.quantity}
                          </td>

                          {/* RATE */}

                          <td className="px-1 py-3 text-right text-[9px]">
                            {formatCurrency(
                              item.price
                            )}
                          </td>

                          {/* AMOUNT */}

                          <td className="px-4 py-3 text-right text-[9px] font-bold">
                            {formatCurrency(
                              total
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}

                  {(!bill.items ||
                    bill.items.length === 0) && (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-8 text-center text-[9px] text-secondary"
                      >
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <div className="px-7 py-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_145px]">
              {/* LEFT */}

              <div>
                <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-secondary">
                  Payment Summary
                </p>

                <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[8px] text-secondary">
                      Subtotal
                    </span>

                    <span className="text-[8px] font-medium">
                      {formatCurrency(
                        bill.subtotal
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[8px] text-secondary">
                      Item Discount
                    </span>

                    <span className="text-[8px] text-red-500">
                      -
                      {formatCurrency(
                        bill.itemDiscount
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[8px] text-secondary">
                      Bill Discount
                    </span>

                    <span className="text-[8px] text-red-500">
                      -
                      {formatCurrency(
                        bill.billDiscount
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[8px] text-secondary">
                      Tax
                    </span>

                    <span className="text-[8px] font-medium">
                      {formatCurrency(
                        bill.tax
                      )}
                    </span>
                  </div>
                </div>

                {/* TOTAL */}

                <div className="mt-4 rounded-md bg-primary px-4 py-3 text-primary-foreground">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[7px] font-semibold uppercase tracking-[0.16em] opacity-70">
                        Total
                      </p>

                      <p className="mt-0.5 text-[7px] opacity-60">
                        Amount payable
                      </p>
                    </div>

                    <p className="text-lg font-bold">
                      {formatCurrency(
                        bill.total
                      )}
                    </p>
                  </div>
                </div>

                {/* RECEIVED / CHANGE */}

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[7px] font-bold uppercase tracking-wider text-secondary">
                      Received
                    </p>

                    <p className="mt-1 text-[9px] font-semibold">
                      {formatCurrency(
                        amountReceived
                      )}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[7px] font-bold uppercase tracking-wider text-secondary">
                      {isDue
                        ? "Due"
                        : "Change"}
                    </p>

                    <p
                      className={`
                        mt-1
                        text-[9px]
                        font-semibold
                        ${
                          isDue
                            ? "text-red-500"
                            : "text-green-600"
                        }
                      `}
                    >
                      {formatCurrency(
                        isDue
                          ? amountDue
                          : change
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  QR
              ================================================= */}

              <div
                id="payment-qr"
                className="
                  rounded-md
                  border
                  border-border
                  bg-background
                  p-3
                  text-center
                "
              >
                <div className="flex items-center justify-center gap-1.5">
                  <QrCode
                    size={11}
                    className="text-primary"
                  />

                  <span className="text-[8px] font-bold">
                    Scan to Pay
                  </span>
                </div>

                <div className="mx-auto mt-3 w-fit rounded-md bg-white p-2">
                  <QRCodeSVG
                    value={upiPaymentUrl}
                    size={86}
                    level="M"
                  />
                </div>

                <p className="mt-2 text-[10px] font-bold text-primary">
                  {formatCurrency(
                    bill.total
                  )}
                </p>

                <p className="mt-0.5 truncate text-[6px] text-secondary">
                  {upiId}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              FINAL PERFORATION
          ================================================= */}

          <div className="relative flex items-center">
            <div
              className="
                absolute
                -left-4
                h-8
                w-8
                rounded-md
                bg-background
              "
            />

            <div className="mx-6 flex-1 border-t border-dashed border-border" />

            <div
              className="
                absolute
                -right-4
                h-8
                w-8
                rounded-md
                bg-background
              "
            />
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="px-7 py-6 text-center">
            <p className="text-[10px] font-semibold">
              Thank you for your purchase
            </p>

            <p className="mt-1 text-[7px] text-secondary">
              Please keep this receipt for your records.
            </p>

            {/* BARCODE STYLE */}

            <div className="mx-auto mt-4 flex h-7 w-fit items-end justify-center gap-[2px] opacity-50">
              {Array.from({
                length: 42,
              }).map((_, index) => (
                <span
                  key={index}
                  className={`
                    bg-foreground
                    ${
                      index % 5 === 0
                        ? "h-7 w-[2px]"
                        : index % 3 === 0
                          ? "h-6 w-[1px]"
                          : "h-5 w-[2px]"
                    }
                  `}
                />
              ))}
            </div>

            <p className="mt-1.5 font-mono text-[6px] tracking-[2px] text-secondary">
              {bill.invoiceNumber}
            </p>

            <p className="mt-3 text-[6px] uppercase tracking-[0.25em] text-secondary">
              Smart Billing • Digital Receipt
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePreview;