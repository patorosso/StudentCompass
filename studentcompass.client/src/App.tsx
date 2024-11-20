import "./App.css";
import React from "react";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Box className={boxClassName} sx={boxStyle}>
        <p>Content</p>
      </Box>
    </React.Fragment>
  );
}

export default App;

// -------- Styles ----------

const boxClassName = "bg-light-theme dark:bg-dark-theme";

const boxStyle = {
  flex: 1,
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
  minHeight: "calc(100vh - 5rem)",
};
