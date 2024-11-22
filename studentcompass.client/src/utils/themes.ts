import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
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
        background: {
          default: "#ffffff",
          paper: "#f7f7f7",
        },
      },
      custom: {
        backgroundImage: "url('/background-light.png')",
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
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        },
      },
      custom: {
        backgroundImage: "url('/background-dark.png')",
      },
    },
  },
});
