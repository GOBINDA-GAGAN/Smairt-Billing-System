import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const EditProfile = () => {
  const { user, loading } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    console.log("Profile Data:", data);
  };

  if (loading) {
    return (
      <div className="flex min-h-[240px] w-full items-center justify-center px-3 text-xs text-secondary sm:min-h-[300px] sm:text-sm">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full rounded-md border border-border bg-card p-4 text-xs text-secondary sm:p-5 sm:text-sm">
        User not found.
      </div>
    );
  }

  return (
    <div className="min-h-full w-full min-w-0 bg-background">
      {/* HEADER */}
      <div className="mb-5 sm:mb-6 md:mb-8">
        <h1 className="text-lg font-semibold text-foreground sm:text-xl">
          Edit Profile
        </h1>

        <p className="mt-1 text-xs leading-4 text-secondary sm:text-sm">
          Update your personal information
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-5 sm:space-y-6 md:space-y-7"
      >
        {/* PROFILE PICTURE */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl sm:h-16 sm:w-16 sm:text-2xl">
            👨🏻‍💼
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground sm:text-sm">
              Profile Picture
            </p>

            <p className="mt-1 max-w-md text-[10px] leading-4 text-secondary sm:text-xs">
              Your profile picture will be visible on your account.
            </p>

            <button
              type="button"
              className="mt-2 rounded-md border border-secondary/20 bg-card px-3 py-1.5 text-[10px] font-medium text-foreground transition hover:bg-secondary/10 sm:mt-3 sm:text-xs"
            >
              Change Picture
            </button>
          </div>
        </div>

        {/* NAME */}
        <div className="min-w-0">
          <label className="mb-1.5 block text-xs font-medium text-foreground sm:mb-2 sm:text-sm">
            Full Name
          </label>

          <div className="flex h-10 min-w-0 items-center gap-2.5 rounded-md border border-secondary/20 bg-card px-3 transition focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 sm:h-11 sm:gap-3 sm:px-3.5">
            <User size={16} className="shrink-0 text-secondary sm:h-[17px] sm:w-[17px]" />

            <input
              {...register("name", {
                required: "Name is required",
              })}
              type="text"
              className="min-w-0 w-full bg-transparent text-xs text-foreground outline-none placeholder:text-secondary sm:text-sm"
            />
          </div>

          {errors.name && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="min-w-0">
          <label className="mb-1.5 block text-xs font-medium text-foreground sm:mb-2 sm:text-sm">
            Email Address
          </label>

          <div className="flex h-10 min-w-0 items-center gap-2.5 rounded-md border border-secondary/20 bg-card px-3 transition focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 sm:h-11 sm:gap-3 sm:px-3.5">
            <Mail size={16} className="shrink-0 text-secondary sm:h-[17px] sm:w-[17px]" />

            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              className="min-w-0 w-full bg-transparent text-xs text-foreground outline-none placeholder:text-secondary sm:text-sm"
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors.email.message}
            </p>
          )}

          <p className="mt-1.5 text-[10px] leading-4 text-secondary sm:mt-2 sm:text-xs">
            This email address is used for your account.
          </p>
        </div>

        {/* MOBILE */}
        <div className="min-w-0">
          <label className="mb-1.5 block text-xs font-medium text-foreground sm:mb-2 sm:text-sm">
            Mobile Number
          </label>

          <div className="flex h-10 min-w-0 items-center gap-2.5 rounded-md border border-secondary/20 bg-card px-3 transition focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 sm:h-11 sm:gap-3 sm:px-3.5">
            <Phone size={16} className="shrink-0 text-secondary sm:h-[17px] sm:w-[17px]" />

            <input
              {...register("mobileNumber")}
              type="tel"
              className="min-w-0 w-full bg-transparent text-xs text-foreground outline-none placeholder:text-secondary sm:text-sm"
            />
          </div>
        </div>

        {/* SAVE */}
        <div className="flex flex-col gap-3 border-t border-secondary/20 pt-4 sm:flex-row sm:items-center sm:justify-end sm:pt-5 md:pt-6">
          <button
            type="submit"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-[0.98] sm:w-auto sm:px-5 sm:text-sm"
          >
            <Save size={15} className="sm:h-4 sm:w-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;