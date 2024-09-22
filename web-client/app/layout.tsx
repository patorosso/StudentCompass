import Navbar from "./components/Navbar";
import StoreProvider from "./utils/StoreProvider";
import ProgressBarProvider from "./utils/ProgressBarProvider";
import type { Metadata } from "next";
import { theme } from "./utils/themes";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import "./styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline, Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Student Compass",
  description: "Navigate your college journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex flex-col h-full">
        <InitColorSchemeScript attribute="class" />
        <main>
          <StoreProvider>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme} disableTransitionOnChange>
                <CssBaseline />
                <Navbar />
                <Box
                  className="bg-light-theme dark:bg-dark-theme"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    overflow: "auto",
                    minHeight: "calc(100vh - 5rem)", // 5rem cause of Navbar
                  }}
                >
                  <ProgressBarProvider>{children}</ProgressBarProvider>
                </Box>
                <ToastContainer
                  style={{ maxWidth: 700, marginTop: 67, width: "auto" }}
                />
              </ThemeProvider>
            </AppRouterCacheProvider>
          </StoreProvider>
        </main>
      </body>
    </html>
  );
}
