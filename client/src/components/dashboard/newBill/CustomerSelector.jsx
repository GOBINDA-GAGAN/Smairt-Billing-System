import React, { useState } from "react";
import {
  Search,
  UserPlus,
  X,
  User,
} from "lucide-react";

const customersData = [
  {
    id: 1,
    name: "Rahul Kumar",
    mobile: "9876543210",
  },
  {
    id: 2,
    name: "Priya Sharma",
    mobile: "9123456780",
  },
  {
    id: 3,
    name: "Amit Das",
    mobile: "8765432109",
  },
];

const CustomerSelector = ({
  customer,
  onCustomerSelect,
}) => {
  const [search, setSearch] = useState("");
  const [showNewCustomer, setShowNewCustomer] =
    useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    mobile: "",
  });

  const filteredCustomers = customersData.filter(
    (item) => {
      const query = search.trim().toLowerCase();

      if (!query) {
        return false;
      }

      return (
        item.name.toLowerCase().includes(query) ||
        item.mobile.includes(query)
      );
    }
  );

  const handleNewCustomerChange = (event) => {
    const { name, value } = event.target;

    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveCustomer = () => {
    const name = newCustomer.name.trim();
    const mobile = newCustomer.mobile.trim();

    if (!name || !mobile) {
      return;
    }

    const customerData = {
      id: Date.now(),
      name,
      mobile,
    };

    onCustomerSelect(customerData);

    setNewCustomer({
      name: "",
      mobile: "",
    });

    setShowNewCustomer(false);
  };

  const handleSelectCustomer = (customerData) => {
    onCustomerSelect(customerData);
    setSearch("");
  };

  return (
    <section className="rounded-lg border border-border bg-card">
      {/* Header */}

      <div className="border-b border-border px-4 py-3">
        <h2 className="text-xs font-semibold text-foreground">
          Customer
        </h2>

        <p className="mt-0.5 text-[10px] text-secondary">
          Select an existing customer or create a new one.
        </p>
      </div>

      <div className="p-4">
        {/* =================================================
            SELECTED CUSTOMER
        ================================================= */}

        {customer ? (
          <div className="flex items-center justify-between rounded-md border border-primary/20 bg-primary/5 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                <User size={15} />
              </div>

              <div>
                <p className="text-xs font-semibold text-foreground">
                  {customer.name}
                </p>

                <p className="mt-0.5 text-[10px] text-secondary">
                  {customer.mobile}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCustomerSelect(null)}
              className="
                flex h-7 w-7
                items-center justify-center
                rounded-md
                text-secondary
                hover:bg-muted
                hover:text-foreground
              "
              title="Change customer"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <>
            {/* =================================================
                NEW CUSTOMER
            ================================================= */}

            {showNewCustomer ? (
              <div className="space-y-4">
                {/* Header */}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold">
                      New Customer
                    </p>

                    <p className="mt-0.5 text-[10px] text-secondary">
                      Add customer details.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewCustomer(false)
                    }
                    className="
                      flex h-7 w-7
                      items-center justify-center
                      rounded-md
                      text-secondary
                      hover:bg-muted
                      hover:text-foreground
                    "
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Fields */}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Name */}

                  <div>
                    <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                      Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={newCustomer.name}
                      onChange={handleNewCustomerChange}
                      placeholder="Enter customer name"
                      className="
                        h-9 w-full rounded-md
                        border border-border
                        bg-background
                        px-3
                        text-xs
                        text-foreground
                        outline-none
                        placeholder:text-secondary
                        focus:border-primary
                      "
                    />
                  </div>

                  {/* Mobile */}

                  <div>
                    <label className="mb-1.5 block text-[10px] font-medium text-secondary">
                      Mobile Number *
                    </label>

                    <input
                      type="tel"
                      name="mobile"
                      value={newCustomer.mobile}
                      onChange={handleNewCustomerChange}
                      maxLength={10}
                      placeholder="Enter mobile number"
                      className="
                        h-9 w-full rounded-md
                        border border-border
                        bg-background
                        px-3
                        text-xs
                        text-foreground
                        outline-none
                        placeholder:text-secondary
                        focus:border-primary
                      "
                    />
                  </div>
                </div>

                {/* Buttons */}

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setShowNewCustomer(false)
                    }
                    className="
                      h-8 rounded-md
                      border border-border
                      px-3
                      text-xs
                      text-secondary
                      hover:bg-muted
                      hover:text-foreground
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveCustomer}
                    className="
                      h-8 rounded-md
                      bg-primary
                      px-3
                      text-xs font-medium
                      text-primary-foreground
                      hover:opacity-90
                    "
                  >
                    Add Customer
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* =================================================
                    SEARCH
                ================================================= */}

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search
                      size={14}
                      className="
                        absolute left-3 top-1/2
                        -translate-y-1/2
                        text-secondary
                      "
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(event) =>
                        setSearch(event.target.value)
                      }
                      placeholder="Search customer by name or mobile..."
                      className="
                        h-9 w-full rounded-md
                        border border-border
                        bg-background
                        pl-9 pr-3
                        text-xs
                        text-foreground
                        outline-none
                        placeholder:text-secondary
                        focus:border-primary
                      "
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewCustomer(true)
                    }
                    className="
                      flex h-9 shrink-0
                      items-center gap-1.5
                      rounded-md
                      border border-border
                      px-3
                      text-xs
                      text-secondary
                      hover:bg-muted
                      hover:text-foreground
                    "
                  >
                    <UserPlus size={14} />
                    New Customer
                  </button>
                </div>

                {/* =================================================
                    SEARCH RESULT
                ================================================= */}

                {search.trim() && (
                  <div className="mt-2 overflow-hidden rounded-md border border-border bg-background">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            handleSelectCustomer(item)
                          }
                          className="
                            flex w-full
                            items-center
                            justify-between
                            border-b border-border
                            px-3 py-2.5
                            text-left
                            last:border-b-0
                            hover:bg-muted/50
                          "
                        >
                          <div>
                            <p className="text-xs font-medium text-foreground">
                              {item.name}
                            </p>

                            <p className="mt-0.5 text-[10px] text-secondary">
                              {item.mobile}
                            </p>
                          </div>

                          <span className="text-[9px] text-primary">
                            Select
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-3">
                        <p className="text-xs text-secondary">
                          No customer found.
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            setShowNewCustomer(true);
                            setSearch("");
                          }}
                          className="
                            mt-1
                            text-[10px]
                            font-medium
                            text-primary
                            hover:underline
                          "
                        >
                          + Create new customer
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CustomerSelector;