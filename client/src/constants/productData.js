import { Package, AlertTriangle, PackageX, IndianRupee } from "lucide-react";

export const productData = [{
  id: 1,
  name: "Paracetamol 650mg",
  description: "Pain relief medicine used to reduce fever and body pain.",
  image: "/products/paracetamol.png",
  sku: "MED-1001",
  category: "Medicine",
  originalPrice: 60,
  sellingPrice: 50,
  discount: 17,
  stock: 120,
  status: "In Stock",
  action: ["view", "edit", "delete"],
  unit: "Strip",
  rating: 4.7,
  reviews: 245,
  shop: "Balasore Medical Store",
  mfgDate: "2026-01-15",
  expDate: "2028-01-14",
}];

export const productStarter = [
  {
    id: 1,
    name: "Total Products",
    totalProduct: 248,
    description: "Products available in your inventory",
    icon: Package,
    increase: 12.5,
  },
  {
    id: 2,
    name: "Low Stock",
    totalProduct: 18,
    description: "Products that need restocking",
    icon: AlertTriangle,
    increase: 8.2,
  },
  {
    id: 3,
    name: "Out of Stock",
    totalProduct: 6,
    description: "Products currently unavailable",
    icon: PackageX,
    increase: -3.4,
  },
  {
    id: 4,
    name: "Total Value",
    totalProduct: 245680,
    description: "Total value of current inventory",
    icon: IndianRupee,
    increase: 14.8,
  },
];
