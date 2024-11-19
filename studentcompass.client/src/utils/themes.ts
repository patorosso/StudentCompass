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
});
