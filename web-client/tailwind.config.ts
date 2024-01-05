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
      },
      screens: {
        s0ml: "1077px",
        s1ml: "1222px",
        s2ml: "1630px",
      },
      colors: {
        primary: {
          DEFAULT: "#6561c0",
          dark: "#7c7aae",
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
        fourth: {
          DEFAULT: "#e2d7e8",
          dark: "#ebe2f0",
        },
        sixth: {
          DEFAULT: "#39a0db",
          dark: "#61b2e4",
        },
        seventh: {
          DEFAULT: "#5f2762",
          dark: "#7a3e78",
        },
        eigth: {
          DEFAULT: "#0b0e1b",
          dark: "#1c1f2c",
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
