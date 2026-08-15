import React, { useMemo, useState } from "react";
import CustomerToolbar from "./CustomerToolbar";
import CustomerTable from "./CustomerTable";
import CustomerPagination from "./CustomerPagination";


const customersData = [
  {
    id: 1,
    name: "Rahul Kumar",
    mobile: "9876543210",
    email: "rahul@gmail.com",
    total: 12500,
    paid: 12500,
    due: 0,
  },
  {
    id: 2,
    name: "Priya Sharma",
    mobile: "9123456780",
    email: "priya@gmail.com",
    total: 8500,
    paid: 6000,
    due: 2500,
  },
  {
    id: 3,
    name: "Amit Das",
    mobile: "9001234567",
    email: "amit@gmail.com",
    total: 4200,
    paid: 4200,
    due: 0,
  },
  {
    id: 4,
    name: "Sneha Patel",
    mobile: "9876123450",
    email: "sneha@gmail.com",
    total: 15000,
    paid: 10000,
    due: 5000,
  },
  {
    id: 5,
    name: "Rajesh Singh",
    mobile: "8765432109",
    email: "rajesh@gmail.com",
    total: 7200,
    paid: 7200,
    due: 0,
  },
  {
    id: 6,
    name: "Anita Das",
    mobile: "9988776655",
    email: "anita@gmail.com",
    total: 9300,
    paid: 7000,
    due: 2300,
  },
];

const AllCustomers = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  // Search + filter
  const filteredCustomers = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return customersData.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchText) ||
        customer.mobile.includes(searchText) ||
        customer.email.toLowerCase().includes(searchText);

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "paid" && customer.due === 0) ||
        (activeTab === "due" && customer.due > 0);

      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / pageSize)
  );

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleEdit = (customer) => {
    console.log("Edit customer:", customer);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Toolbar */}
      <CustomerToolbar
        search={search}
        setSearch={setSearch}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      {/* Table */}
      <CustomerTable
        customers={paginatedCustomers}
        onEdit={handleEdit}
      />

      {/* Pagination */}
      <CustomerPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalCustomers={filteredCustomers.length}
        pageSize={pageSize}
      />
    </div>
  );
};

export default AllCustomers;