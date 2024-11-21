import React from "react";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Box sx={boxStyle}>
        <p>Content</p>
      </Box>
    </React.Fragment>
  );
}

export default App;

// -------- Styles ----------

const boxStyle = {
  overflow: "auto",
  flexDirection: "column",
};
