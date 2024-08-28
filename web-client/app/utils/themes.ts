"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
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
  typography: { fontFamily: roboto.style.fontFamily },
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
  typography: { fontFamily: roboto.style.fontFamily },
});
