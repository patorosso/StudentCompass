import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "light-theme": "url('/background-light.png')",
        "dark-theme": "url('/background-dark.png')",
      },
      screens: {
        s0ml: "1077px",
        s1ml: "1222px",
        s2ml: "1630px",
      },
      height: {
        md: "300px",
        lg: "600px",
        xl: "920px",
      },
      colors: {
        primary: {
          DEFAULT: "#6561c0",
          dark: "#7c7aae",
        },
        secondary: {
          DEFAULT: "#251f30",
        },
        first: {
          DEFAULT: "#151e39",
          dark: "#2a3658",
        },
        second: {
          DEFAULT: "#e90b93",
          dark: "#f172b0",
        },
        third: {
          DEFAULT: "#541c7c",
          dark: "#6e3d94",
        },
        success: {
          DEFAULT: "#22c55e",
          dark: "#66bb6a",
        },
        cancel: {
          DEFAULT: "#f44336",
          dark: "#f6685e",
        },
        surface: {
          "100": "#121212",
          "200": "#282828",
          "300": "#3f3f3f",
          "400": "#575757",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
