import React from "react";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/30 backdrop-blur-md  border-gray-400 border-b-[1px] dark:bg-slate-800/30">
      <nav className="flex items-center justify-between max-w-6xl mx-auto py-4 px-4 h-full">
        <Link
          href="/"
          className="text-xl font-semibold text-gray-700 hover:text-white"
        >
          Student Compass
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-white">
            Dashboard
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-white">
            Me
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-white">
            About us
          </Link>
          <div className="flex pl-24 pr-8">
            <ThemeToggler />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
