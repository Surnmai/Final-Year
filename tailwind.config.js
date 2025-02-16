const { placeholder } = require("drizzle-orm");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ["Epilogue", "sans-serif", "Poppins"],
      },
      boxShadow: {
        secondary: "10px 10px 20px rgba(2, 2, 2, 0.25)",
      },
      colors: {
        primary: "#13131a",
        Sidebar_bgColor: "#1c1c24",
        Sidebar_iconBg: "#2c2f32",
        mainBackgroundColor: "#0D1117",
        columnBackgroundColor: "#161C22",
        placeholderColor: "#4b5264",
        searchIconColor: "#1dc071",
        modal_bg: "#13131a",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
