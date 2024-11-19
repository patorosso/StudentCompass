import "./App.css";
import { theme } from "./utils/themes";
import { ToastContainer } from "react-toastify";
import { Box, ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {/* <Navbar /> */}
      <Box className="bg-light-theme dark:bg-dark-theme" sx={boxStyle}>
        <p>Content</p>
      </Box>
      <ToastContainer style={toastStyle} />
    </ThemeProvider>
  );
}

export default App;

// -------- Styles ----------

const boxStyle = {
  flex: 1,
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
  minHeight: "calc(100vh - 5rem)",
};

const toastStyle = {
  maxWidth: 700,
  marginTop: 67,
  width: "auto",
};
