/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    // file input button
    "file:mr-4",
    "file:rounded-xl",
    "file:border-0",
    "file:px-4",
    "file:py-2",
    "file:bg-primary-400",
    "file:text-white",
    "file:font-semibold",
    "hover:file:bg-primary-500",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "rgb(var(--mx-primary-400) / <alpha-value>)",
          500: "rgb(var(--mx-primary-500) / <alpha-value>)",
          600: "rgb(var(--mx-primary-600) / <alpha-value>)",
        },
        secondary: {
          500: "rgb(var(--mx-secondary-500) / <alpha-value>)",
          600: "rgb(var(--mx-secondary-600) / <alpha-value>)",
        },

        // Neutrales UI
        text: "rgb(var(--mx-text) / <alpha-value>)",
        muted: "rgb(var(--mx-muted) / <alpha-value>)",
        border: "rgb(var(--mx-border) / <alpha-value>)",
        surface: "rgb(var(--mx-surface) / <alpha-value>)",
        bg: "rgb(var(--mx-bg) / <alpha-value>)",

        // Semánticos
        success: {
          50: "rgb(var(--mx-success-50) / <alpha-value>)",
          600: "rgb(var(--mx-success-600) / <alpha-value>)",
          700: "rgb(var(--mx-success-700) / <alpha-value>)",
        },
        warning: {
          50: "rgb(var(--mx-warning-50) / <alpha-value>)",
          500: "rgb(var(--mx-warning-500) / <alpha-value>)",
          600: "rgb(var(--mx-warning-600) / <alpha-value>)",
          700: "rgb(var(--mx-warning-700) / <alpha-value>)",
        },
        danger: {
          50: "rgb(var(--mx-danger-50) / <alpha-value>)",
          600: "rgb(var(--mx-danger-600) / <alpha-value>)",
          700: "rgb(var(--mx-danger-700) / <alpha-value>)",
        },
        info: {
          50: "rgb(var(--mx-info-50) / <alpha-value>)",
          600: "rgb(var(--mx-info-600) / <alpha-value>)",
          700: "rgb(var(--mx-info-700) / <alpha-value>)",
        },
        loader: {
          track: "rgb(var(--mx-loader-track) / <alpha-value>)",
          DEFAULT: "rgb(var(--mx-loader) / <alpha-value>)",
        },
        text: "rgb(var(--mx-text) / <alpha-value>)",
        muted: "rgb(var(--mx-muted) / <alpha-value>)",
        border: "rgb(var(--mx-border) / <alpha-value>)",
        surface: "rgb(var(--mx-surface) / <alpha-value>)",
        bg: "rgb(var(--mx-bg) / <alpha-value>)",

        "mx-primary-400": "rgb(var(--mx-primary-400) / <alpha-value>)",
        "mx-secondary-500": "rgb(var(--mx-secondary-500) / <alpha-value>)",

        "table-header-bg": "rgb(var(--mx-table-header-bg) / <alpha-value>)",
        "table-header-text": "rgb(var(--mx-table-header-text) / <alpha-value>)",
        "table-row-hover": "rgb(var(--mx-table-row-hover) / <alpha-value>)",

        "nav-action-bg": "rgb(var(--mx-nav-action-bg) / <alpha-value>)",
        "nav-action-bg-hover": "rgb(var(--mx-nav-action-bg-hover) / <alpha-value>)",
        "nav-action-text": "rgb(var(--mx-nav-action-text) / <alpha-value>)",


      },
    },
  },
  plugins: [],
};
