import Sidebar from "./components/Sidebar";
import { Box, Container } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "auto",
        mx: "auto",
        minHeight: "calc(100vh - 5rem)",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
