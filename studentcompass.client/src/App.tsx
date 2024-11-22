import React from "react";
import { Box } from "@mui/material";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Box sx={boxStyle}>
        <Home />
      </Box>
    </React.Fragment>
  );
}

export default App;

// -------- Styles ----------

const boxStyle = {
  flexDirection: "column",
  minHeight: "100vh",
};
