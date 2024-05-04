import Navbar from "./components/Navbar";
import StoreProvider from "./utils/StoreProvider";
import ProgressBarProvider from "./utils/ProgressBarProvider";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";

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
    <StoreProvider>
      <html lang="en" className="h-full">
        <body className="flex flex-col h-full font-figtree">
          <Navbar />
          <div
            className="flex-1 overflow-auto bg-light-theme dark:bg-dark-theme"
            style={{ minHeight: "calc(100vh - 5rem)" }}
          >
            <ProgressBarProvider> {children}</ProgressBarProvider>
          </div>
          <ToastContainer
            style={{ maxWidth: 700, marginTop: 67, width: "auto" }}
          />
        </body>
      </html>
    </StoreProvider>
  );
}
