"use client";
import { Figtree } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const figtree = Figtree({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#6561c0",
        },
        secondary: {
          main: "#E90B93",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#6561c0",
        },
        secondary: {
          main: "#E90B93",
        },
      },
    },
  },

  typography: { fontFamily: figtree.style.fontFamily },
});
