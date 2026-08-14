import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner"

const RegisterPage = () => {
  const navigate = useNavigate();

  const { register: registerUser, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success(response?.message || "Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-xl p-6 sm:p-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">Create Account</h2>

          <p className="mt-2 text-foreground-secondary">
            Create your account to manage your shop and billing.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <div
              className={`flex h-12 items-center rounded-xl border bg-background px-4 ${
                errors.name ? "border-red-500" : "border-border"
              }`}
            >
              <User size={18} className="mr-3 text-foreground-muted" />

              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-transparent outline-none"
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>

            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <div
              className={`flex h-12 items-center rounded-xl border bg-background px-4 ${
                errors.email ? "border-red-500" : "border-border"
              }`}
            >
              <Mail size={18} className="mr-3 text-foreground-muted" />

              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-transparent outline-none"
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>

              <div
                className={`flex h-12 items-center rounded-xl border bg-background px-4 ${
                  errors.password ? "border-red-500" : "border-border"
                }`}
              >
                <Lock size={18} className="mr-3 text-foreground-muted" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-foreground-muted hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>

              <div
                className={`flex h-12 items-center rounded-xl border bg-background px-4 ${
                  errors.confirmPassword ? "border-red-500" : "border-border"
                }`}
              >
                <Lock size={18} className="mr-3 text-foreground-muted" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-foreground-muted hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-2 flex h-12 w-full
              items-center justify-center gap-2
              rounded-xl
              bg-primary
              font-medium
              text-primary-foreground
              transition
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading ? "Creating Account..." : "Create Account"}

            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />

          <span className="text-xs text-foreground-muted">OR</span>

          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Google UI only */}
        <button
          type="button"
          className="
            flex h-12 w-full
            items-center justify-center gap-3
            rounded-xl
            border border-border
            bg-background
            font-medium
            transition
            hover:bg-secondary
          "
        >
          <span className="font-bold">G</span>
          Continue with Google
        </button>

        {/* Login */}
        <p className="mt-8 text-center text-sm text-foreground-secondary">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
