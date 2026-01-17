// CVOWF Official Brand Colors
// Non-Negotiable brand color system for consistency across all components

export const BRAND_COLORS = {
  // Primary Brand Colors
  PRIMARY: "#4B2E83", // Deep Purple - leadership, dignity
  SECONDARY: "#F5A623", // Warm Gold - courage, hope

  // Brand Backgrounds
  WHITE: "#FFFFFF", // Clean backgrounds
  LIGHT_GRAY: "#F5F6F8", // Soft light gray backgrounds

  // CSS Class References (for Tailwind)
  CSS: {
    primary: "primary-700",
    primaryLight: "primary-100",
    primaryDark: "primary-800",
    secondary: "secondary-500",
    secondaryLight: "secondary-100",
    secondaryDark: "secondary-600",
    brandWhite: "brand-white",
    brandLight: "brand-light",
  },
};

// Design guidelines for generated content
export const BRAND_GUIDELINES = {
  dominantColors: [BRAND_COLORS.PRIMARY, BRAND_COLORS.SECONDARY],
  accentColor: BRAND_COLORS.SECONDARY,
  backgroundColors: [BRAND_COLORS.WHITE, BRAND_COLORS.LIGHT_GRAY],

  // For AI-generated images and illustrations
  colorPrompts: {
    dominant: "deep purple #4B2E83",
    accent: "warm gold #F5A623",
    background: "clean white or soft light gray",
    style: "flat, modern, professional NGO aesthetic",
  },

  // Visual style constraints
  style: {
    aesthetic: "modern NGO / humanitarian",
    gradients: "subtle and brand-aligned only",
    contrast: "WCAG AA minimum",
    tone: "empowering, trustworthy, dignified",
  },
};

// Utility functions for consistent color application
export const getBrandClass = (colorType, variant = "default") => {
  const classMap = {
    primary: {
      default: "text-primary-700",
      bg: "bg-primary-700",
      bgLight: "bg-primary-100",
      border: "border-primary-700",
      hover: "hover:bg-primary-800",
    },
    secondary: {
      default: "text-secondary-500",
      bg: "bg-secondary-500",
      bgLight: "bg-secondary-100",
      border: "border-secondary-500",
      hover: "hover:bg-secondary-600",
    },
    gradient: {
      primary: "bg-gradient-to-r from-primary-700 to-primary-600",
      secondary: "bg-gradient-to-r from-secondary-500 to-secondary-400",
      brand: "bg-gradient-to-r from-primary-700 to-secondary-500",
    },
  };

  return classMap[colorType]?.[variant] || "";
};

export default BRAND_COLORS;
