import React from "react";
import { customerStatsCard } from "../constants/dashboardData";
import CustomerStatCard from "../components/dashboard/customers/CustomerStatCard";
import AllCustomers from "../components/dashboard/customers/AllCustomers";

const Customers = () => {
  return (
    <div className="bg-background text-foreground space-y-3">
       <section className="grid grid-cols-4 gap-4">
        {customerStatsCard.map((stat) => (
          <CustomerStatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
          />
        ))}
      </section>

      <section>

        <AllCustomers/>
      </section>
    </div>
  );
};

export default Customers;
