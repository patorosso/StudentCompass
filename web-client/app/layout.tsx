// RootLayout.tsx
import { Inter } from "next/font/google";
import { UserProvider } from "./context/userContext";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

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
      <body className="flex flex-col h-full">
        <UserProvider>
          <Navbar />
          <main className="flex-1" style={{ minHeight: "calc(100vh - 5rem)" }}>
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
