/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        // CVOWF Brand Colors - Official Palette
        primary: {
          50: "#f6f4fb",
          100: "#ede9f6",
          200: "#ddd6ee",
          300: "#c4b7de",
          400: "#a490ca",
          500: "#8469b5",
          600: "#6d4ca0",
          700: "#4B2E83", // Main brand - Deep Purple (leadership, dignity)
          800: "#3d2569",
          900: "#341f56",
        },
        secondary: {
          50: "#fefbf4",
          100: "#fdf4e3",
          200: "#fbe7c1",
          300: "#f8d495",
          400: "#f5c367",
          500: "#F5A623", // Main accent - Warm Gold (courage, hope)
          600: "#e6941a",
          700: "#d17e0e",
          800: "#ad6711",
          900: "#8c5412",
        },
        // Brand neutrals
        brand: {
          white: "#FFFFFF", // Clean backgrounds
          light: "#F5F6F8", // Soft light gray backgrounds
          purple: "#4B2E83", // Primary brand color
          gold: "#F5A623", // Secondary brand color
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e", // Success green - kept for accessibility
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        warning: {
          50: "#fefbf4",
          100: "#fdf4e3",
          200: "#fbe7c1",
          300: "#f8d495",
          400: "#f5c367",
          500: "#F5A623", // Warning uses brand gold
          600: "#e6941a",
          700: "#d17e0e",
          800: "#ad6711",
          900: "#8c5412",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444", // Error red - kept for accessibility
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
        ],
        display: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium:
          "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        large:
          "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 4px 25px -5px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
    },
  },
  plugins: [],
};
