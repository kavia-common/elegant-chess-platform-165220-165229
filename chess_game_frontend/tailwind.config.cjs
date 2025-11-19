import colors from "tailwindcss/colors.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,js,jsx,ts,tsx}",
    "./src/**/*.astro",
    "./src/**/*.js",
    "./src/**/*.tsx",
    "./src/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // Blue
        secondary: "#F59E0B", // Amber
        background: "#f9fafb",
        surface: "#ffffff",
        error: "#EF4444",
        accent: "#2563eb",
        chessboardDark: "#183862",
        chessboardLight: "#dae8fa",
        bordercard: "#e0e7ef",
        ...colors,
      },
      boxShadow: {
        ocean: "0 4px 24px 0 rgba(37,99,235,0.18)",
      },
      borderRadius: {
        board: "1.5rem",
        button: "0.75rem",
      },
    },
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui"],
    },
  },
  plugins: [],
};
