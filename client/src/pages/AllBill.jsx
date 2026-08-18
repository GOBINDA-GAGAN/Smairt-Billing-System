import React from "react";
import { FileText, IndianRupee, ShoppingBag, Users } from "lucide-react";
import AllBillStatCard from "../components/dashboard/AllBIll/AllBillStatCard";
import BillToolbar from "../components/dashboard/AllBIll/BillToolbar";
import BillItemsTable from "../components/dashboard/newBill/BillItemsTable";
import BillTable from "../components/dashboard/AllBIll/BillTable";
const AllBill = () => {
  const stats = [
    {
      title: "Total Bills",
      value: "256",
      description: "This Month",
      icon: FileText,
    },
    {
      title: "Total Sales",
      value: "₹1,28,560.75",
      description: "This Month",
      icon: IndianRupee,
    },
    {
      title: "Average Bill Value",
      value: "₹502.19",
      description: "This Month",
      icon: ShoppingBag,
    },
    {
      title: "Total Customers",
      value: "189",
      description: "This Month",
      icon: Users,
    },
  ];
  return (
    <div className="bg-background text-foreground space-y-3">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">All Bill</h1>
          <p className="text-sm text-secondary">See your all Bill and Manage</p>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-4">
        {stats.map((card) => {
          return <AllBillStatCard value={card.id} {...card} />;
        })}
      </section>

      <section>
        <BillToolbar />
      </section>

      <section>
        <BillTable />
      </section>
    </div>
  );
};

export default AllBill;
