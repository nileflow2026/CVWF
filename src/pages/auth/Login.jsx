import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";
import { validation, security } from "../../utils/validation";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, setError } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Rate limiting
  const rateLimit = security.createRateLimit(5, 15 * 60 * 1000);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = security.sanitizeInput(value);

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear global error
    if (error) {
      setError(null);
    }
  };

  const validateForm = () => {
    const errors = {};

    errors.email = validation.email(formData.email);
    if (!formData.password) errors.password = "Password is required";

    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Rate limiting check
    const rateLimitResult = rateLimit("login-" + formData.email);
    if (!rateLimitResult.allowed) {
      const resetTime = new Date(rateLimitResult.resetTime);
      setError(
        `Too many login attempts. Please try again after ${resetTime.toLocaleTimeString()}`
      );
      return;
    }

    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password);

      // Redirect to intended page or dashboard based on role
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (error) {
      setLoginAttempts((prev) => prev + 1);
      // Error is handled by the auth context
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your CVOWF account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`form-input ${
                  formErrors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                aria-describedby={formErrors.email ? "email-error" : undefined}
                aria-invalid={formErrors.email ? "true" : "false"}
              />
              {formErrors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {formErrors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`form-input pr-12 ${
                    formErrors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  aria-describedby={
                    formErrors.password ? "password-error" : undefined
                  }
                  aria-invalid={formErrors.password ? "true" : "false"}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p
                  id="password-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {formErrors.password}
                </p>
              )}
            </div>
          </div>

          {/* Global Error */}
          {error && (
            <div
              className="bg-red-50 border border-red-200 rounded-md p-3"
              role="alert"
            >
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex justify-center items-center"
              aria-describedby="login-help"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Links */}
          <div className="flex items-center justify-between text-sm">
            <Link
              to="/auth/reset-password"
              className="text-blue-600 hover:text-blue-500 focus-visible-ring"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/auth/signup"
                className="text-blue-600 hover:text-blue-500 font-medium focus-visible-ring"
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
