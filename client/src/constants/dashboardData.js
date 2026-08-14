
import {
  CircleDollarSign,
  IndianRupee,
  Receipt,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";

//done 💕
export const statCardsData = [
  {
    id: 1,
    title: "Total Sales",
    value: "₹24,580",
    icon: CircleDollarSign,
    trend: "+12.5%",
    description: "vs yesterday",
    trendType: "increase",
  },
  {
    id: 2,
    title: "Total Bills",
    value: "32",
    icon: Receipt,
    trend: "+8.2%",
    description: "vs yesterday",
    trendType: "increase",
  },
  {
    id: 3,
    title: "Customers",
    value: "24",
    icon: Users,
    trend: "+5.4%",
    description: "vs yesterday",
    trendType: "increase",
  },
  {
    id: 4,
    title: "Total Due",
    value: "₹2,780",
    icon: Wallet,
    trend: "-4.2%",
    description: "vs yesterday",
    trendType: "decrease",
  },
];




export const dashboardSummary = {
  today: {
    sales: 24580,
    bills: 32,
    customers: 24,
    paid: 21800,
    due: 2780,
  },

  yesterday: {
    sales: 19850,
    bills: 27,
    customers: 19,
    paid: 17600,
    due: 2250,
  },

  week: {
    sales: 142650,
    bills: 184,
    customers: 126,
    paid: 128400,
    due: 14250,
  },

  month: {
    sales: 584920,
    bills: 742,
    customers: 418,
    paid: 541200,
    due: 43720,
  },

  year: {
    sales: 6845200,
    bills: 8945,
    customers: 2840,
    paid: 6452800,
    due: 392400,
  },
};

export const customers = [
  {
    id: "CUS001",
    name: "Rajesh Kumar",
    mobile: "9876543210",
    totalBills: 12,
    totalAmount: 24500,
    paidAmount: 22000,
    dueAmount: 2500,
    lastBill: "2026-08-14",
  },
  {
    id: "CUS002",
    name: "Amit Das",
    mobile: "9123456780",
    totalBills: 8,
    totalAmount: 16800,
    paidAmount: 16800,
    dueAmount: 0,
    lastBill: "2026-08-14",
  },
  {
    id: "CUS003",
    name: "Suresh Patel",
    mobile: "9988776655",
    totalBills: 15,
    totalAmount: 38200,
    paidAmount: 34000,
    dueAmount: 4200,
    lastBill: "2026-08-13",
  },
  {
    id: "CUS004",
    name: "Priya Sharma",
    mobile: "9090909090",
    totalBills: 6,
    totalAmount: 12400,
    paidAmount: 12400,
    dueAmount: 0,
    lastBill: "2026-08-12",
  },
  {
    id: "CUS005",
    name: "Rakesh Singh",
    mobile: "9876501234",
    totalBills: 10,
    totalAmount: 28600,
    paidAmount: 24600,
    dueAmount: 4000,
    lastBill: "2026-08-11",
  },
];

export const customersData = [
  {
    id: "CUS001",
    name: "Rajesh Kumar",
    mobile: "9876543210",
    address: "Balasore, Odisha",
    totalDue: 2500,
    createdAt: "2026-08-14",
  },
  {
    id: "CUS002",
    name: "Amit Das",
    mobile: "9123456780",
    address: "Bhubaneswar, Odisha",
    totalDue: 0,
    createdAt: "2026-08-14",
  },
  {
    id: "CUS003",
    name: "Suresh Patel",
    mobile: "9988776655",
    address: "Cuttack, Odisha",
    totalDue: 4200,
    createdAt: "2026-08-10",
  },
  {
    id: "CUS004",
    name: "Priya Sharma",
    mobile: "9090909090",
    address: "Balasore, Odisha",
    totalDue: 0,
    createdAt: "2026-08-05",
  },
  {
    id: "CUS005",
    name: "Rakesh Singh",
    mobile: "9876501234",
    address: "Puri, Odisha",
    totalDue: 4000,
    createdAt: "2026-08-01",
  },
];

//done 💕
export const recentBillsData = [
  {
    id: "INV-1001",
    customerId: "CUS001",
    customerName: "Rajesh Kumar",
    mobile: "9876543210",
    date: "2026-08-14",
    items: 4,
    subtotal: 5200,
    discount: 200,
    total: 5000,
    paid: 5000,
    due: 0,
    paymentMode: "UPI",
    status: "Paid",
  },
  {
    id: "INV-1002",
    customerId: "CUS002",
    customerName: "Amit Das",
    mobile: "9123456780",
    date: "2026-08-14",
    items: 3,
    subtotal: 3800,
    discount: 100,
    total: 3700,
    paid: 2500,
    due: 1200,
    paymentMode: "Cash",
    status: "Due",
  },
  {
    id: "INV-1003",
    customerId: "CUS003",
    customerName: "Suresh Patel",
    mobile: "9988776655",
    date: "2026-08-14",
    items: 6,
    subtotal: 7200,
    discount: 400,
    total: 6800,
    paid: 6800,
    due: 0,
    paymentMode: "Card",
    status: "Paid",
  },
  {
    id: "INV-1004",
    customerId: "CUS004",
    customerName: "Priya Sharma",
    mobile: "9090909090",
    date: "2026-08-13",
    items: 2,
    subtotal: 2400,
    discount: 100,
    total: 2300,
    paid: 1500,
    due: 800,
    paymentMode: "Cash",
    status: "Due",
  },
  {
    id: "INV-1005",
    customerId: "CUS005",
    customerName: "Rakesh Singh",
    mobile: "9876501234",
    date: "2026-08-13",
    items: 5,
    subtotal: 6100,
    discount: 200,
    total: 5900,
    paid: 5900,
    due: 0,
    paymentMode: "UPI",
    status: "Paid",
  },
];



//done 💕
export const salesChart = {
  today: [
    { label: "9 AM", sales: 1200 },
    { label: "10 AM", sales: 1850 },
    { label: "11 AM", sales: 2400 },
    { label: "12 PM", sales: 3100 },
    { label: "1 PM", sales: 2200 },
    { label: "2 PM", sales: 3600 },
    { label: "3 PM", sales: 4100 },
    { label: "4 PM", sales: 2800 },
    { label: "5 PM", sales: 3330 },
  ],

  week: [
    { label: "Mon", sales: 18500 },
    { label: "Tue", sales: 22400 },
    { label: "Wed", sales: 19800 },
    { label: "Thu", sales: 24600 },
    { label: "Fri", sales: 28500 },
    { label: "Sat", sales: 31200 },
    { label: "Sun", sales: 27650 },
  ],

  month: [
    { label: "Week 1", sales: 128500 },
    { label: "Week 2", sales: 142800 },
    { label: "Week 3", sales: 151420 },
    { label: "Week 4", sales: 162200 },
  ],

  year: [
    { label: "Jan", sales: 425000 },
    { label: "Feb", sales: 468000 },
    { label: "Mar", sales: 512000 },
    { label: "Apr", sales: 489000 },
    { label: "May", sales: 540000 },
    { label: "Jun", sales: 575000 },
    { label: "Jul", sales: 612000 },
    { label: "Aug", sales: 584000 },
    { label: "Sep", sales: 0 },
    { label: "Oct", sales: 0 },
    { label: "Nov", sales: 0 },
    { label: "Dec", sales: 0 },
  ],
};

export const paymentModeData = [
  {
    mode: "UPI",
    amount: 12800,
    transactions: 14,
  },
  {
    mode: "Cash",
    amount: 6200,
    transactions: 11,
  },
  {
    mode: "Card",
    amount: 4800,
    transactions: 6,
  },
  {
    mode: "Other",
    amount: 780,
    transactions: 1,
  },
];

export const salesReport = {
  totalSales: 24580,
  totalBills: 32,
  averageBillValue: 768,
  totalDiscount: 1280,
  totalPaid: 21800,
  totalDue: 2780,

  topProducts: [
    {
      name: "Premium Shirt",
      quantity: 18,
      sales: 9000,
    },
    {
      name: "Cotton Pant",
      quantity: 12,
      sales: 7200,
    },
    {
      name: "Sports Shoes",
      quantity: 7,
      sales: 4900,
    },
    {
      name: "T-Shirt",
      quantity: 14,
      sales: 2800,
    },
  ],
};

export const dueCustomers = [
  {
    id: "CUS001",
    name: "Rajesh Kumar",
    mobile: "9876543210",
    billId: "INV-0992",
    total: 5000,
    paid: 3000,
    due: 2000,
    dueDate: "2026-08-20",
  },
  {
    id: "CUS003",
    name: "Suresh Patel",
    mobile: "9988776655",
    billId: "INV-0987",
    total: 6800,
    paid: 5000,
    due: 1800,
    dueDate: "2026-08-18",
  },
  {
    id: "CUS005",
    name: "Rakesh Singh",
    mobile: "9876501234",
    billId: "INV-0978",
    total: 5900,
    paid: 4000,
    due: 1900,
    dueDate: "2026-08-22",
  },
];

//done 💕
export const dashboardFilters = [
  {
    key: "today",
    label: "Today",
  },
  {
    key: "yesterday",
    label: "Yesterday",
  },
  {
    key: "week",
    label: "This Week",
  },
  {
    key: "month",
    label: "This Month",
  },
  {
    key: "year",
    label: "Last Year",
  },
  {
    key: "custom",
    label: "Custom",
  },
];

export const customerStatsCard = [
  {
    id: "total-customers",
    title: "Total Customers",
    value: 1248,
    description: "All customers",
    icon: Users,
  },
  {
    id: "new-customers",
    title: "New Customers",
    value: 12,
    description: "Added today",
    icon: UserPlus,
  },
  {
    id: "customers-due",
    title: "Customers with Due",
    value: 24,
    description: "Pending payment",
    icon: Wallet,
  },
  {
    id: "total-due",
    title: "Total Due",
    value: 32450,
    description: "Outstanding amount",
    icon: IndianRupee,
  },
];

export const dashboardData = {
  summary: dashboardSummary,
  customers,
  statCardsData,
  customersData,
  recentBillsData,
  salesChart,
  paymentModeData,
  salesReport,
  dueCustomers,
  dashboardFilters,
  customerStatsCard
};

export default dashboardData;