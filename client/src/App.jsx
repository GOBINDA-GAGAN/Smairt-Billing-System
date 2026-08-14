import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import Layout from "./layout/ShopKeperLayout";
import AdminLayout from "./layout/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import NewBill from "./pages/NewBill";
import Customers from "./pages/Customers";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import EditProfile from "./pages/EditProfile";
import AccountLayout from "./layout/AccountLayout";
import Password from "./pages/Password";
import YourShop from "./pages/YourShop";
import GuestRoute from "./routes/GuestRoute";

const App = () => {
  return (
    <Routes>
      {/* GuestRoute*/}
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
            <Route path="/customers" element={<Customers />} />
            <Route element={<AccountLayout />}>
              <Route path="/account" element={<Account />} />
              <Route path="/account/profile" element={<EditProfile />} />
              <Route path="/account/password" element={<Password />} />
              {/* <Route path="/account/billing" element={<Billing />} />
              <Route
                path="/account/notifications"
                element={<Notifications />}
              /> */}
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
  );
};

export default App;
