import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";
import { validation, security } from "../../utils/validation";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword, updatePassword, error, setError } = useAuth();

  // Check if this is a reset completion (has userId and secret in URL)
  const urlParams = new URLSearchParams(location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");
  const isResetCompletion = !!(userId && secret);

  const [currentStep, setCurrentStep] = useState(
    isResetCompletion ? "reset" : "request"
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form data for password reset request
  const [emailData, setEmailData] = useState({
    email: "",
  });

  // Form data for password reset completion
  const [resetData, setResetData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Auto-focus on the appropriate step
  useEffect(() => {
    if (isResetCompletion) {
      setCurrentStep("reset");
    }
  }, [isResetCompletion]);

  const handleInputChange = (e, dataType) => {
    const { name, value } = e.target;
    const sanitizedValue = security.sanitizeInput(value);

    if (dataType === "email") {
      setEmailData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
    } else {
      setResetData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
    }

    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear global error
    if (error) {
      setError(null);
    }
  };

  const validateEmailForm = () => {
    const errors = {};
    errors.email = validation.email(emailData.email);
    setFormErrors(errors);
    return !errors.email;
  };

  const validateResetForm = () => {
    const errors = {};
    errors.newPassword = validation.password(resetData.newPassword);
    errors.confirmPassword = validation.confirmPassword(
      resetData.newPassword,
      resetData.confirmPassword
    );
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmailForm()) return;

    setLoading(true);
    try {
      await resetPassword(emailData.email.trim().toLowerCase());
      setSuccess(true);
      setCurrentStep("sent");
    } catch (error) {
      // Error is handled by the auth context
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (!validateResetForm()) return;

    setLoading(true);
    try {
      await updatePassword(
        userId,
        secret,
        resetData.newPassword,
        resetData.confirmPassword
      );
      setSuccess(true);
      setCurrentStep("complete");
    } catch (error) {
      // Error is handled by the auth context
    } finally {
      setLoading(false);
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

  const passwordStrength = getPasswordStrength(resetData.newPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Request Password Reset */}
        {currentStep === "request" && (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Reset Your Password
              </h1>
              <p className="text-gray-600">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>

            <form
              onSubmit={handleEmailSubmit}
              className="mt-8 space-y-6"
              noValidate
            >
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
                  value={emailData.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  aria-describedby={
                    formErrors.email ? "email-error" : undefined
                  }
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

              {error && (
                <div
                  className="bg-red-50 border border-red-200 rounded-md p-3"
                  role="alert"
                >
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

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
                      Sending Reset Link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </div>

              <div className="text-center">
                <Link
                  to="/auth/login"
                  className="text-blue-600 hover:text-blue-500 text-sm focus-visible-ring"
                >
                  ← Back to Sign In
                </Link>
              </div>
            </form>
          </>
        )}

        {/* Reset Link Sent */}
        {currentStep === "sent" && (
          <>
            <div className="text-center">
              <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
              <h1 className="mt-4 text-3xl font-bold text-gray-900 mb-2">
                Check Your Email
              </h1>
              <p className="text-gray-600">
                We've sent a password reset link to{" "}
                <strong>{emailData.email}</strong>
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-2">Next steps:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the reset link in the email</li>
                  <li>Create a new password</li>
                </ul>
              </div>
            </div>

            <div className="text-center space-y-2">
              <button
                onClick={() => {
                  setCurrentStep("request");
                  setEmailData({ email: "" });
                  setError(null);
                }}
                className="text-blue-600 hover:text-blue-500 text-sm focus-visible-ring"
              >
                Didn't receive the email? Try again
              </button>
              <br />
              <Link
                to="/auth/login"
                className="text-gray-500 hover:text-gray-700 text-sm focus-visible-ring"
              >
                ← Back to Sign In
              </Link>
            </div>
          </>
        )}

        {/* Complete Password Reset */}
        {currentStep === "reset" && (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create New Password
              </h1>
              <p className="text-gray-600">
                Enter a new password for your account.
              </p>
            </div>

            <form
              onSubmit={handleResetSubmit}
              className="mt-8 space-y-6"
              noValidate
            >
              {/* New Password Field */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password *
                </label>
                <div className="mt-1 relative">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`form-input pr-12 ${
                      formErrors.newPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="Enter your new password"
                    value={resetData.newPassword}
                    onChange={(e) => handleInputChange(e, "reset")}
                    aria-describedby="password-requirements password-strength"
                    aria-invalid={formErrors.newPassword ? "true" : "false"}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    aria-label={
                      showNewPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showNewPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {resetData.newPassword && (
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

                {formErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {formErrors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm New Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password *
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
                    placeholder="Confirm your new password"
                    value={resetData.confirmPassword}
                    onChange={(e) => handleInputChange(e, "reset")}
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

              {error && (
                <div
                  className="bg-red-50 border border-red-200 rounded-md p-3"
                  role="alert"
                >
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

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
                      Updating Password...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </button>
              </div>
            </form>
          </>
        )}

        {/* Password Reset Complete */}
        {currentStep === "complete" && (
          <>
            <div className="text-center">
              <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
              <h1 className="mt-4 text-3xl font-bold text-gray-900 mb-2">
                Password Updated!
              </h1>
              <p className="text-gray-600">
                Your password has been successfully updated.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-sm text-green-700">
                You can now sign in with your new password.
              </p>
            </div>

            <div>
              <Link
                to="/auth/login"
                className="btn-primary w-full flex justify-center items-center"
              >
                Sign In to Your Account
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
