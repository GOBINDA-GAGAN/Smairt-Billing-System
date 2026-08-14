import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, EyeOff, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const user = await login({
        email: data.email,
        password: data.password,
      });

      navigate("/");
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-10 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-2xl font-bold">
            ₹
          </div>

          <h1 className="text-3xl font-bold text-gradient">Welcome Back</h1>

          <p className="mt-2 text-foreground-secondary">
            Sign in to continue to your billing dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <div
              className={`flex items-center gap-3 rounded-md border bg-background px-4 ${
                errors.email ? "border-red-500" : "border-border"
              }`}
            >
              <Mail size={18} className="text-foreground-muted" />

              <input
                type="email"
                placeholder="john@example.com"
                className="h-12 w-full bg-transparent outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
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
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>

            <div
              className={`flex items-center gap-3 rounded-md border bg-background px-4 ${
                errors.password ? "border-red-500" : "border-border"
              }`}
            >
              <Lock size={18} className="shrink-0 text-foreground-muted" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 w-full bg-transparent outline-none"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="shrink-0 text-foreground-muted transition hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
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

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("rememberMe")} />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}

            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Register */}
        <p className="mt-8 text-center text-sm text-foreground-secondary">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
