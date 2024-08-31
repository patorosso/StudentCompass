import Navbar from "./components/Navbar";
import StoreProvider from "./utils/StoreProvider";
import ProgressBarProvider from "./utils/ProgressBarProvider";
import type { Metadata } from "next";
import { theme } from "./utils/themes";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@mui/material";

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
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full font-figtree">
        <StoreProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme} disableTransitionOnChange>
              <CssBaseline />
              <Navbar />
              <div
                className="flex-1 overflow-auto bg-light-theme dark:bg-dark-theme"
                style={{ minHeight: "calc(100vh - 5rem)" }}
              >
                <ProgressBarProvider>{children}</ProgressBarProvider>
              </div>
              <ToastContainer
                style={{ maxWidth: 700, marginTop: 67, width: "auto" }}
              />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
