import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import AddProduct from "./components/dashboard/products/AddProduct";
import InvoicePreview from "./pages/InvoicePreview";
import CreateShop from "./pages/CreateShop";
import Settings from "./pages/Settings";
import CategoryPage from "./pages/CategoryPage";
import AllBill from "./pages/AllBill";
import BillDetails from "./pages/BillDetails";
import BrandCategoryDetails from "./pages/BrandCategoryDetails";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

const Layout = lazy(() => import("./layout/ShopKeperLayout"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Account = lazy(() => import("./pages/Account"));
const NewBill = lazy(() => import("./pages/NewBill"));
const Customers = lazy(() => import("./pages/Customers"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));

const RoleRoute = lazy(() => import("./routes/RoleRoute"));

const GuestRoute = lazy(() => import("./routes/GuestRoute"));

const AccountLayout = lazy(() => import("./layout/AccountLayout"));

const EditProfile = lazy(() => import("./pages/EditProfile"));

const Password = lazy(() => import("./pages/Password"));

const YourShop = lazy(() => import("./pages/YourShop"));

const PageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-secondary/30 border-t-primary" />

        <span className="text-sm text-secondary">Loading...</span>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Guest */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          {/* SHOP OWNER */}
          <Route element={<RoleRoute allowedRoles={["SHOP_OWNER"]} />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/new-bill" element={<NewBill />} />
              <Route path="/all-bills" element={<AllBill />} />
              <Route path="/bills/:billId" element={<BillDetails />} />

              <Route path="/billing/new" element={<NewBill />} />
              <Route path="/products" element={<Product />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/billing/invoice/:id" element={<InvoicePreview />} />
              <Route path="/categorys&brands" element={<CategoryPage />} />
              <Route path="/brands/:id" element={<BrandCategoryDetails type="brand" />}/>
              <Route path="/categories/:id" element={<BrandCategoryDetails type="category" />}/>

              <Route path="/shop/create" element={<CreateShop />} />
              {/* Account */}
              <Route element={<AccountLayout />}>
                <Route path="/account" element={<Account />} />
                <Route path="/account/profile" element={<EditProfile />} />
                <Route path="/account/password" element={<Password />} />
                <Route path="/account/setting" element={<Settings />} />

                <Route path="/account/shop" element={<YourShop />} />
              </Route>
            </Route>
          </Route>

          {/* ADMIN */}
          <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
