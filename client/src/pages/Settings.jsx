import React, { useState } from "react";
import {
  User,
  Store,
  Bell,
  Shield,
  Receipt,
  Palette,
  Database,
  Globe,
  Settings as SettingsIcon,
  KeyRound,
  Trash2,
  LogOut,
  ChevronRight,
} from "lucide-react";

const Settings = () => {
  const [active, setActive] = useState("account");

  const settings = [
    { id: "shop", label: "Shop", description: "Shop information and business details", icon: Store },
    { id: "billing", label: "Billing & Invoice", description: "Invoice, tax and billing preferences", icon: Receipt },
    { id: "notifications", label: "Notifications", description: "Manage alerts and notifications", icon: Bell },
    { id: "security", label: "Security", description: "Password and account security", icon: Shield },
    { id: "appearance", label: "Appearance", description: "Theme and interface preferences", icon: Palette },
    { id: "regional", label: "Regional", description: "Language, currency and date format", icon: Globe },
    { id: "data", label: "Data & Backup", description: "Backup, export and data management", icon: Database },
    { id: "advanced", label: "Advanced", description: "Advanced application preferences", icon: SettingsIcon },
  ];

  return (
    <div className="w-full min-w-0">
      <div className="mb-4 sm:mb-5">
        <h1 className="text-lg font-semibold text-foreground sm:text-xl">
          Settings
        </h1>

        <p className="mt-1 text-[10px] leading-4 text-secondary sm:text-xs">
          Manage your account, shop, application and system preferences.
        </p>
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-6">
        {/* NAVIGATION */}
        <aside className="min-w-0">
          <nav className="flex items-center gap-1 overflow-x-auto rounded-lg border border-border bg-card p-1 sm:gap-0.5 lg:block lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0">
            {settings.map(({ id, label, description, icon: Icon }) => (
              <button
                key={id}
                type="button"
                title={label}
                onClick={() => setActive(id)}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-auto sm:w-auto sm:justify-start sm:gap-2 sm:px-2.5 sm:py-2 lg:w-full ${
                  active === id
                    ? "bg-primary/10 text-primary"
                    : "text-secondary hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon size={15} className="shrink-0" />

                {/* TABLET */}
                <span className="hidden text-xs font-medium sm:inline lg:hidden">
                  {label}
                </span>

                {/* DESKTOP */}
                <span className="hidden min-w-0 flex-1 text-left lg:block">
                  <span className="block truncate text-xs font-medium">
                    {label}
                  </span>

                  <span className="mt-0.5 block truncate text-[9px] opacity-70">
                    {description}
                  </span>
                </span>

                <ChevronRight
                  size={12}
                  className="hidden shrink-0 lg:block"
                />
              </button>
            ))}
          </nav>
        </aside>

        {/* CONTENT */}
        <main className="min-w-0 overflow-hidden rounded-lg border border-border bg-card">
          {active === "account" && <AccountSettings />}
          {active === "shop" && <ShopSettings />}
          {active === "billing" && <BillingSettings />}
          {active === "notifications" && <NotificationSettings />}
          {active === "security" && <SecuritySettings />}
          {active === "appearance" && <AppearanceSettings />}
          {active === "regional" && <RegionalSettings />}
          {active === "data" && <DataSettings />}
          {active === "advanced" && <AdvancedSettings />}
        </main>
      </div>
    </div>
  );
};

const Section = ({ title, description, children }) => (
  <section className="min-w-0">
    <div className="border-b border-border px-3 py-3 sm:px-4 sm:py-4">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>

      <p className="mt-1 text-[9px] leading-4 text-secondary sm:text-[10px]">
        {description}
      </p>
    </div>

    <div className="space-y-2.5 p-3 sm:space-y-3 sm:p-4">
      {children}
    </div>
  </section>
);

const SettingRow = ({ title, description, children }) => (
  <div className="flex min-w-0 flex-col gap-2.5 rounded-md border border-border p-3 sm:p-3.5 md:flex-row md:items-center md:justify-between">
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-foreground">
        {title}
      </p>

      <p className="mt-0.5 max-w-xl text-[9px] leading-4 text-secondary sm:text-[10px]">
        {description}
      </p>
    </div>

    <div className="flex w-full shrink-0 justify-end md:w-auto">
      {children}
    </div>
  </div>
);

const Toggle = ({ defaultChecked = false }) => (
  <label className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center">
    <input
      type="checkbox"
      defaultChecked={defaultChecked}
      className="peer sr-only"
    />

    <span className="absolute inset-0 rounded-full bg-secondary/30 transition peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20" />

    <span className="absolute left-1 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
  </label>
);

const Select = ({ children, defaultValue }) => (
  <select
    defaultValue={defaultValue}
    className="h-9 w-full min-w-0 rounded-md border border-border bg-background px-2.5 text-xs text-foreground outline-none focus:border-primary sm:w-auto sm:min-w-[120px]"
  >
    {children}
  </select>
);

const ActionButton = ({ children, danger = false }) => (
  <button
    type="button"
    className={`flex h-9 w-full items-center justify-center gap-2 rounded-md border px-3 text-xs font-medium transition sm:w-auto ${
      danger
        ? "border-red-500/30 text-red-500 hover:bg-red-500/10"
        : "border-border text-foreground hover:bg-muted"
    }`}
  >
    {children}
  </button>
);

const AccountSettings = () => (
  <Section
    title="Account"
    description="Manage your personal account information."
  >
    <SettingRow
      title="Profile"
      description="Manage your name, email and personal information."
    >
      <ActionButton>Edit Profile</ActionButton>
    </SettingRow>

    <SettingRow
      title="Profile Picture"
      description="Change the picture displayed on your account."
    >
      <ActionButton>Change</ActionButton>
    </SettingRow>
  </Section>
);

const ShopSettings = () => (
  <Section
    title="Shop"
    description="Manage your business and shop configuration."
  >
    <SettingRow
      title="Shop Information"
      description="Name, owner, contact information and address."
    >
      <ActionButton>Manage</ActionButton>
    </SettingRow>

    <SettingRow
      title="Business Registration"
      description="GST and FSSAI registration information."
    >
      <ActionButton>Manage</ActionButton>
    </SettingRow>

    <SettingRow
      title="Low Stock Threshold"
      description="Default quantity at which products are considered low stock."
    >
      <input
        type="number"
        defaultValue="10"
        className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs outline-none focus:border-primary sm:w-24"
      />
    </SettingRow>
  </Section>
);

const BillingSettings = () => (
  <Section
    title="Billing & Invoice"
    description="Configure how invoices and bills are generated."
  >
    <SettingRow
      title="Invoice Numbering"
      description="Automatically generate invoice numbers."
    >
      <Toggle defaultChecked />
    </SettingRow>

    <SettingRow
      title="Show GST on Invoice"
      description="Display GST information on customer invoices."
    >
      <Toggle defaultChecked />
    </SettingRow>

    <SettingRow
      title="Show FSSAI Number"
      description="Display FSSAI information on applicable invoices."
    >
      <Toggle defaultChecked />
    </SettingRow>

    <SettingRow
      title="Invoice Prefix"
      description="Prefix used when generating invoice numbers."
    >
      <input
        type="text"
        placeholder="INV"
        className="h-9 w-full rounded-md border border-border bg-background px-3 text-xs uppercase outline-none focus:border-primary sm:w-24"
      />
    </SettingRow>

    <SettingRow
      title="Tax Calculation"
      description="Choose how tax is calculated for products."
    >
      <Select defaultValue="inclusive">
        <option value="inclusive">Inclusive</option>
        <option value="exclusive">Exclusive</option>
      </Select>
    </SettingRow>
  </Section>
);

const NotificationSettings = () => (
  <Section
    title="Notifications"
    description="Choose which notifications you want to receive."
  >
    <SettingRow
      title="Low Stock Alerts"
      description="Get notified when inventory reaches the low stock threshold."
    >
      <Toggle defaultChecked />
    </SettingRow>

    <SettingRow
      title="Out of Stock Alerts"
      description="Get notified when a product reaches zero quantity."
    >
      <Toggle defaultChecked />
    </SettingRow>

    <SettingRow
      title="New Order Notifications"
      description="Receive notifications when a new order is created."
    >
      <Toggle defaultChecked />
    </SettingRow>

    <SettingRow
      title="Email Notifications"
      description="Receive important application notifications by email."
    >
      <Toggle />
    </SettingRow>
  </Section>
);

const SecuritySettings = () => (
  <Section
    title="Security"
    description="Protect your account and manage access."
  >
    <SettingRow
      title="Change Password"
      description="Update your account password."
    >
      <ActionButton>
        <KeyRound size={13} />
        Change
      </ActionButton>
    </SettingRow>

    <SettingRow
      title="Two-Factor Authentication"
      description="Add an additional layer of protection to your account."
    >
      <Toggle />
    </SettingRow>

    <SettingRow
      title="Login Alerts"
      description="Get notified about new account logins."
    >
      <Toggle defaultChecked />
    </SettingRow>

    <SettingRow
      title="Logout All Devices"
      description="Sign out of all other active sessions."
    >
      <ActionButton>
        <LogOut size={13} />
        Logout
      </ActionButton>
    </SettingRow>
  </Section>
);

const AppearanceSettings = () => (
  <Section
    title="Appearance"
    description="Customize how the application looks."
  >
    <SettingRow
      title="Theme"
      description="Choose the application color theme."
    >
      <Select defaultValue="system">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </Select>
    </SettingRow>

    <SettingRow
      title="Compact Mode"
      description="Reduce spacing throughout the application."
    >
      <Toggle />
    </SettingRow>

    <SettingRow
      title="Animations"
      description="Enable interface animations and transitions."
    >
      <Toggle defaultChecked />
    </SettingRow>
  </Section>
);

const RegionalSettings = () => (
  <Section
    title="Regional"
    description="Configure language, currency and regional formats."
  >
    <SettingRow
      title="Language"
      description="Application display language."
    >
      <Select defaultValue="en">
        <option value="en">English</option>
      </Select>
    </SettingRow>

    <SettingRow
      title="Currency"
      description="Currency used throughout billing."
    >
      <Select defaultValue="inr">
        <option value="inr">INR ₹</option>
        <option value="usd">USD $</option>
      </Select>
    </SettingRow>

    <SettingRow
      title="Date Format"
      description="Format used for displaying dates."
    >
      <Select defaultValue="dd-mm-yyyy">
        <option value="dd-mm-yyyy">DD-MM-YYYY</option>
        <option value="mm-dd-yyyy">MM-DD-YYYY</option>
        <option value="yyyy-mm-dd">YYYY-MM-DD</option>
      </Select>
    </SettingRow>

    <SettingRow
      title="Time Format"
      description="Format used for displaying time."
    >
      <Select defaultValue="12">
        <option value="12">12 Hour</option>
        <option value="24">24 Hour</option>
      </Select>
    </SettingRow>
  </Section>
);

const DataSettings = () => (
  <Section
    title="Data & Backup"
    description="Manage your application data and backups."
  >
    <SettingRow
      title="Export Data"
      description="Download your shop data for backup or analysis."
    >
      <ActionButton>Export</ActionButton>
    </SettingRow>

    <SettingRow
      title="Automatic Backup"
      description="Automatically back up important shop data."
    >
      <Toggle defaultChecked />
    </SettingRow>

    <SettingRow
      title="Clear Cache"
      description="Remove locally cached application data."
    >
      <ActionButton>Clear</ActionButton>
    </SettingRow>
  </Section>
);

const AdvancedSettings = () => (
  <Section
    title="Advanced"
    description="Advanced application and account controls."
  >
    <SettingRow
      title="API Access"
      description="Manage API access for external integrations."
    >
      <ActionButton>Manage</ActionButton>
    </SettingRow>

    <SettingRow
      title="Developer Mode"
      description="Enable additional developer and debugging features."
    >
      <Toggle />
    </SettingRow>

    <div className="rounded-md border border-red-500/20 bg-red-500/5 p-3">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium text-red-500">
            Delete Account
          </p>

          <p className="mt-1 text-[9px] leading-4 text-secondary">
            Permanently delete your account and associated data.
          </p>
        </div>

        <ActionButton danger>
          <Trash2 size={13} />
          Delete Account
        </ActionButton>
      </div>
    </div>
  </Section>
);

export default Settings;