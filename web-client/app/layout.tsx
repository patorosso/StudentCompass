import { UserProvider } from "./context/userContext";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

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
        <UserProvider>
          <Navbar />
          <div
            className="flex-1 overflow-auto"
            style={{ minHeight: "calc(100vh - 5rem)" }}
          >
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
