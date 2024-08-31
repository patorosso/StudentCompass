"use client";
import { Figtree } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const figtree = Figtree({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6561c0",
    },
    secondary: {
      main: "#251f30",
    },
    background: {
      default: "#1e1b4b",
      paper: "#f7f7f7",
    },
  },
  typography: { fontFamily: figtree.style.fontFamily },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7c7aae",
    },
    secondary: {
      main: "#251f30",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: { fontFamily: figtree.style.fontFamily },
});
