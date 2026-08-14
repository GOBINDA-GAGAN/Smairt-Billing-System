import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

const Layout = lazy(() => import("./layout/ShopKeperLayout"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Account = lazy(() => import("./pages/Account"));
const NewBill = lazy(() => import("./pages/NewBill"));
const Customers = lazy(() => import("./pages/Customers"));

const AdminDashboard = lazy(
  () => import("./pages/admin/AdminDashboard")
);

const ProtectedRoute = lazy(
  () => import("./routes/ProtectedRoute")
);

const RoleRoute = lazy(
  () => import("./routes/RoleRoute")
);

const GuestRoute = lazy(
  () => import("./routes/GuestRoute")
);

const AccountLayout = lazy(
  () => import("./layout/AccountLayout")
);

const EditProfile = lazy(
  () => import("./pages/EditProfile")
);

const Password = lazy(
  () => import("./pages/Password")
);

const YourShop = lazy(
  () => import("./pages/YourShop")
);

const PageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-secondary/30 border-t-primary" />

        <span className="text-sm text-secondary">
          Loading...
        </span>
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
              <Route path="/customers" element={<Customers />} />

              {/* Account */}
              <Route element={<AccountLayout />}>
                <Route
                  path="/account"
                  element={<Account />}
                />

                <Route
                  path="/account/profile"
                  element={<EditProfile />}
                />

                <Route
                  path="/account/password"
                  element={<Password />}
                />

                <Route
                  path="/account/shop"
                  element={<YourShop />}
                />
              </Route>

            </Route>
          </Route>

          {/* ADMIN */}
          <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
            <Route element={<AdminLayout />}>
              <Route
                path="/admin"
                element={<AdminDashboard />}
              />
            </Route>
          </Route>

        </Route>

      </Routes>
    </Suspense>
  );
};

export default App;