import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";
import StoreProvider from "./StoreProvider";

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
            {children}
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
