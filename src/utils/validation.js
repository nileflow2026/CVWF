import { useState } from "react";

// Form validation utilities
export const validation = {
  // Email validation
  email: (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    if (email.length > 255) return "Email must be less than 255 characters";
    return "";
  },

  // Password validation
  password: (password) => {
    if (!password) return "Password is required";
    if (password.length < 8)
      return "Password must be at least 8 characters long";
    if (password.length > 128)
      return "Password must be less than 128 characters";
    if (!/(?=.*[a-z])/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(password))
      return "Password must contain at least one number";
    return "";
  },

  // Password confirmation
  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword) return "Please confirm your password";
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
  },

  // Name validation
  name: (name, fieldName = "Name") => {
    if (!name) return `${fieldName} is required`;
    const trimmedName = name.trim();
    if (trimmedName.length < 2)
      return `${fieldName} must be at least 2 characters long`;
    if (trimmedName.length > 50)
      return `${fieldName} must be less than 50 characters`;
    if (!/^[a-zA-Z\s'-]+$/.test(trimmedName))
      return `${fieldName} contains invalid characters`;
    return "";
  },

  // Phone validation (optional)
  phone: (phone) => {
    if (!phone) return ""; // Phone is optional
    const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{7,15}$/;
    if (!phoneRegex.test(phone)) return "Please enter a valid phone number";
    return "";
  },

  // Role validation
  role: (role, allowedRoles = ["donor", "volunteer", "admin"]) => {
    if (!role) return "Role is required";
    if (!allowedRoles.includes(role)) return "Invalid role selected";
    return "";
  },
};

// Form state management utility
export const useFormValidation = (initialState, validationRules) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    if (validationRules[name]) {
      return validationRules[name](value, values);
    }
    return "";
  };

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((name) => {
      const error = validateField(name, values[name]);
      newErrors[name] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validationRules).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    return isValid;
  };

  const reset = () => {
    setValues(initialState);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  };
};

// Security utilities
export const security = {
  // Sanitize input to prevent XSS
  sanitizeInput: (input) => {
    if (typeof input !== "string") return input;
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  },

  // Rate limiting helper
  createRateLimit: (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
    const attempts = new Map();

    return (identifier) => {
      const now = Date.now();
      const userAttempts = attempts.get(identifier) || [];

      // Remove old attempts outside the window
      const recentAttempts = userAttempts.filter(
        (time) => now - time < windowMs
      );

      if (recentAttempts.length >= maxAttempts) {
        return { allowed: false, resetTime: recentAttempts[0] + windowMs };
      }

      recentAttempts.push(now);
      attempts.set(identifier, recentAttempts);

      return {
        allowed: true,
        attemptsLeft: maxAttempts - recentAttempts.length,
      };
    };
  },
};
