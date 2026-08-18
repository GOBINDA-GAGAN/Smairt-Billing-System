import React from "react";
import { Tag, Award, Package, CircleCheck } from "lucide-react";
import CategoryStatCard from "../components/dashboard/categoryAndBrand/CategoryStatCard";

const CategoryPage = () => {
  const stats = [
    {
      title: "Total Categories",
      value: "12",
      description: "+2 this month",
      icon: Tag,
    },
    {
      title: "Total Brands",
      value: "28",
      description: "+4 this month",
      icon: Award,
    },
    {
      title: "Total Products",
      value: "256",
      description: "+18 this month",
      icon: Package,
    },
    {
      title: "Active Items",
      value: "40",
      description: "96% active",
      icon: CircleCheck,
    },
  ];

  return (
    <div className="bg-background text-foreground space-y-3">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Category & Brand</h1>
          <p className="text-sm text-secondary">
            Manage your Category and Brand
          </p>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-4">
        {stats.map((card) => {
          return <CategoryStatCard value={card.id} {...card}/>
        })}
      </section>
    </div>
  );
};

export default CategoryPage;
