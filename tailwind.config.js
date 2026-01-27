/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        
      },
    },
  },
  plugins: [],
};
