import React from "react";
import { MoreVertical, Pencil, User } from "lucide-react";
import { RiWhatsappLine } from "react-icons/ri";

const CustomerRow = ({ customer, onEdit }) => {
  const hasDue = customer.due > 0;

  return (
    <tr className="border-b border-border transition-colors hover:bg-muted/30">
      {/* Customer */}
      <td className="px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            {customer.image ? (
              <img
                src={customer.image}
                alt={customer.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User size={16} />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-foreground">
              {customer.name}
            </p>

            <p className="mt-0.5 truncate text-[10px] text-secondary">
              {customer.mobile}
            </p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-4 py-2.5 text-xs text-secondary">
        {customer.email || "-"}
      </td>

      {/* Total */}
      <td className="px-4 py-2.5">
        <span className="text-xs font-semibold text-foreground">
          ₹{Number(customer.total).toLocaleString("en-IN")}
        </span>
      </td>

      {/* Paid */}
      <td className="px-4 py-2.5">
        <span className="text-xs font-medium text-green-600">
          ₹{Number(customer.paid).toLocaleString("en-IN")}
        </span>
      </td>

      {/* Due */}
      <td className="px-4 py-2.5">
        <span
          className={`text-xs font-medium ${
            hasDue ? "text-red-500" : "text-secondary"
          }`}
        >
          ₹{Number(customer.due).toLocaleString("en-IN")}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-2.5">
        <span
          className={`
            inline-flex rounded-md
            px-2 py-1
            text-[9px] font-medium
            ${
              hasDue
                ? "bg-red-500/10 text-red-500"
                : "bg-green-500/10 text-green-600"
            }
          `}
        >
          {hasDue ? "Due" : "Paid"}
        </span>
      </td>

      <td className="px-4 py-2.5">
        <button
          type="button"
          onClick={() => {
            const phone = customer.mobile.replace(/\D/g, "");

            window.open(`https://wa.me/91${phone}`, "_blank");
          }}
          className="
      flex h-7 w-7 items-center justify-center
      rounded-md
      text-green-600
      transition-colors
      hover:bg-green-500/20
    "
          title="Chat on WhatsApp"
        >
          <RiWhatsappLine size={14}  />
        </button>
      </td>

      {/* Actions */}
      <td className="px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(customer)}
            className="
              flex h-7 w-7 items-center justify-center
              rounded-md border border-border
              text-secondary
              transition-colors
              hover:bg-muted hover:text-foreground
            "
          >
            <Pencil size={13} />
          </button>

          <button
            type="button"
            className="
              flex h-7 w-7 items-center justify-center
              rounded-md border border-border
              text-secondary
              transition-colors
              hover:bg-muted hover:text-foreground
            "
          >
            <MoreVertical size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CustomerRow;
