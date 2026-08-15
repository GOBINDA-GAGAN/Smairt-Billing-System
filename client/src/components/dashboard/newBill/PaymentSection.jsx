import React from "react";
import {
  Banknote,
  Smartphone,
  CreditCard,
  Clock3,
} from "lucide-react";

const PaymentSection = ({
  total = 0,
  paymentMethod,
  onPaymentMethodChange,
  amountReceived,
  onAmountReceivedChange,
}) => {
  const paymentMethods = [
    {
      id: "Cash",
      label: "Cash",
      icon: Banknote,
    },
    {
      id: "UPI",
      label: "UPI",
      icon: Smartphone,
    },
    {
      id: "Card",
      label: "Card",
      icon: CreditCard,
    },
    {
      id: "Due",
      label: "Due",
      icon: Clock3,
    },
  ];

  const received = Number(amountReceived || 0);

  const change =
    paymentMethod === "Cash"
      ? Math.max(received - total, 0)
      : 0;

  const due =
    paymentMethod === "Due"
      ? total
      : Math.max(total - received, 0);

  const formatCurrency = (value) => {
    return `₹${Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <section className="rounded-lg border border-border bg-card">
      {/* Header */}

      <div className="border-b border-border px-4 py-3">
        <h2 className="text-xs font-semibold">
          Payment
        </h2>

        <p className="mt-0.5 text-[9px] text-secondary">
          Select payment method and enter payment details.
        </p>
      </div>

      <div className="space-y-4 p-4">
        {/* Payment Methods */}

        <div>
          <label className="mb-2 block text-[10px] font-medium text-secondary">
            Payment Method
          </label>

          <div className="grid grid-cols-2 gap-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;

              const active =
                paymentMethod === method.id;

              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() =>
                    onPaymentMethodChange(method.id)
                  }
                  className={`
                    flex h-9
                    items-center
                    justify-center
                    gap-1.5
                    rounded-md
                    border
                    text-[10px]
                    font-medium
                    transition-colors
                    ${
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-secondary hover:bg-muted hover:text-foreground"
                    }
                  `}
                >
                  <Icon size={13} />

                  {method.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Amount Received */}

        {paymentMethod !== "Due" && (
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-secondary">
              Amount Received
            </label>

            <div className="relative">
              <span
                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  text-xs text-secondary
                "
              >
                ₹
              </span>

              <input
                type="number"
                min="0"
                value={amountReceived}
                onChange={(event) =>
                  onAmountReceivedChange(
                    event.target.value
                  )
                }
                placeholder="0.00"
                className="
                  h-9 w-full rounded-md
                  border border-border
                  bg-background
                  pl-7 pr-3
                  text-xs
                  outline-none
                  placeholder:text-secondary
                  focus:border-primary
                "
              />
            </div>
          </div>
        )}

        {/* Cash Change */}

        {paymentMethod === "Cash" && (
          <div className="rounded-md bg-muted/40 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-secondary">
                Change
              </span>

              <span className="text-xs font-semibold text-green-600">
                {formatCurrency(change)}
              </span>
            </div>
          </div>
        )}

        {/* UPI / Card Remaining */}

        {(paymentMethod === "UPI" ||
          paymentMethod === "Card") &&
          received < total && (
            <div className="rounded-md bg-yellow-500/10 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-yellow-600">
                  Remaining
                </span>

                <span className="text-xs font-semibold text-yellow-600">
                  {formatCurrency(due)}
                </span>
              </div>
            </div>
          )}

        {/* Due */}

        {paymentMethod === "Due" && (
          <div className="rounded-md bg-red-500/10 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-red-500">
                Amount Due
              </span>

              <span className="text-xs font-semibold text-red-500">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        )}

        {/* Total */}

        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold">
              Payable Amount
            </span>

            <span className="text-base font-bold text-primary">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;