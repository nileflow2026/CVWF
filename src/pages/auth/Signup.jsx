import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";
import { validation, security } from "../../utils/validation";

const Signup = () => {
  const navigate = useNavigate();
  const { register, loading, error, setError } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "donor",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Role options for selection
  const roleOptions = [
    {
      value: "donor",
      label: "Donor",
      description: "Make donations and track impact",
      icon: "💝",
    },
    {
      value: "volunteer",
      label: "Volunteer",
      description: "Join programs and volunteer activities",
      icon: "🤝",
    },
  ];

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

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    if (formErrors.role) {
      setFormErrors((prev) => ({ ...prev, role: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    errors.firstName = validation.name(formData.firstName, "First name");
    errors.lastName = validation.name(formData.lastName, "Last name");
    errors.email = validation.email(formData.email);
    errors.phone = validation.phone(formData.phone);
    errors.password = validation.password(formData.password);
    errors.confirmPassword = validation.confirmPassword(
      formData.password,
      formData.confirmPassword
    );
    errors.role = validation.role(formData.role, ["donor", "volunteer"]);

    if (!acceptTerms) {
      errors.terms = "You must accept the Terms of Service and Privacy Policy";
    }

    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: formData.role,
      });

      // Redirect to dashboard or welcome page
      navigate("/dashboard", {
        state: {
          message:
            "Account created successfully! Please check your email to verify your account.",
        },
      });
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "bg-gray-200" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    const strengthMap = {
      0: { label: "Very Weak", color: "bg-red-500" },
      1: { label: "Weak", color: "bg-red-400" },
      2: { label: "Fair", color: "bg-yellow-400" },
      3: { label: "Good", color: "bg-blue-500" },
      4: { label: "Strong", color: "bg-green-500" },
      5: { label: "Very Strong", color: "bg-green-600" },
    };

    return { strength, ...strengthMap[strength] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join CVOWF and make a difference
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className={`mt-1 form-input ${
                    formErrors.firstName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  aria-describedby={
                    formErrors.firstName ? "firstName-error" : undefined
                  }
                  aria-invalid={formErrors.firstName ? "true" : "false"}
                />
                {formErrors.firstName && (
                  <p
                    id="firstName-error"
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                  >
                    {formErrors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className={`mt-1 form-input ${
                    formErrors.lastName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  aria-describedby={
                    formErrors.lastName ? "lastName-error" : undefined
                  }
                  aria-invalid={formErrors.lastName ? "true" : "false"}
                />
                {formErrors.lastName && (
                  <p
                    id="lastName-error"
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                  >
                    {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`mt-1 form-input ${
                  formErrors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="john@example.com"
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

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={`mt-1 form-input ${
                  formErrors.phone
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleInputChange}
                aria-describedby={formErrors.phone ? "phone-error" : undefined}
                aria-invalid={formErrors.phone ? "true" : "false"}
              />
              {formErrors.phone && (
                <p
                  id="phone-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {formErrors.phone}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-3">
                  I want to join as *
                </legend>
                <div className="space-y-3">
                  {roleOptions.map((option) => (
                    <div key={option.value}>
                      <label className="relative flex cursor-pointer rounded-lg border bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 hover:bg-gray-50">
                        <input
                          type="radio"
                          name="role"
                          value={option.value}
                          checked={formData.role === option.value}
                          onChange={() => handleRoleChange(option.value)}
                          className="sr-only"
                          aria-describedby={`${option.value}-description`}
                        />
                        <span className="flex flex-1 items-center">
                          <span className="text-2xl mr-3" aria-hidden="true">
                            {option.icon}
                          </span>
                          <span className="block text-sm">
                            <span className="font-medium text-gray-900">
                              {option.label}
                            </span>
                            <span
                              id={`${option.value}-description`}
                              className="block text-gray-500"
                            >
                              {option.description}
                            </span>
                          </span>
                        </span>
                        {formData.role === option.value && (
                          <CheckCircleIcon
                            className="h-5 w-5 text-blue-600"
                            aria-hidden="true"
                          />
                        )}
                      </label>
                    </div>
                  ))}
                </div>
                {formErrors.role && (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {formErrors.role}
                  </p>
                )}
              </fieldset>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password *
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className={`form-input pr-12 ${
                    formErrors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  aria-describedby="password-requirements password-strength"
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                        }}
                      />
                    </div>
                    <span
                      id="password-strength"
                      className="text-xs text-gray-600"
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                </div>
              )}

              <div
                id="password-requirements"
                className="mt-2 text-xs text-gray-500"
              >
                Password must contain at least 8 characters with uppercase,
                lowercase, and numbers.
              </div>

              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password *
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className={`form-input pr-12 ${
                    formErrors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  aria-describedby={
                    formErrors.confirmPassword
                      ? "confirmPassword-error"
                      : undefined
                  }
                  aria-invalid={formErrors.confirmPassword ? "true" : "false"}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Acceptance */}
            <div>
              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  aria-describedby="terms-description"
                />
                <label
                  htmlFor="acceptTerms"
                  className="ml-3 block text-sm text-gray-700"
                >
                  <span id="terms-description">
                    I accept the{" "}
                    <Link
                      to="/terms"
                      className="text-blue-600 hover:text-blue-500"
                      target="_blank"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-blue-600 hover:text-blue-500"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>
              {formErrors.terms && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {formErrors.terms}
                </p>
              )}
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

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex justify-center items-center"
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-blue-600 hover:text-blue-500 font-medium focus-visible-ring"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
