import React from "react";
import { Tag, Award, Package, CircleCheck } from "lucide-react";
import CategoryStatCard from "../components/dashboard/categoryAndBrand/CategoryStatCard";
import Categories from "../components/dashboard/categoryAndBrand/Categories";
import Brands from "../components/dashboard/categoryAndBrand/Brands";

const CategoryPage = () => {
  const stats = [
    { title: "Total Categories", value: "12", description: "+2 this month", icon: Tag },
    { title: "Total Brands", value: "28", description: "+4 this month", icon: Award },
    { title: "Total Products", value: "256", description: "+18 this month", icon: Package },
    { title: "Active Items", value: "40", description: "96% active", icon: CircleCheck },
  ];

  return (
    <div className="w-full min-w-0 space-y-4 bg-background text-foreground">
      <section>
        <h1 className="text-xl font-semibold sm:text-2xl">Category & Brand</h1>
        <p className="text-xs text-secondary sm:text-sm">Manage your Category and Brand</p>
      </section>

      {/* 2x2 mobile, 4 columns desktop */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((card) => (
          <CategoryStatCard key={card.title} {...card} />
        ))}
      </section>

      {/* Stacked mobile, side-by-side desktop */}
      <section className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="min-w-0 overflow-hidden">
          <Categories />
        </div>

        <div className="min-w-0 overflow-hidden">
          <Brands />
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;