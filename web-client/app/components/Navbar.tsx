import React from "react";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

const Navbar = () => {
  return (
    <header className="sticky top-0 h-20 border-gray-400 dark:border-gray-500 border-b-[1px] dark:bg-black">
      <nav className="flex items-center justify-between max-w-6xl mx-auto py-4 px-4 h-full">
        <Link
          href="/"
          className="text-xl text-black dark:text-white hover:text-second dark:hover:text-primary"
        >
          StudentCompass
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="text-gray-600 dark:text-gray-300 hover:text-second dark:hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-600 dark:text-gray-300 hover:text-second dark:hover:text-primary"
          >
            Me
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-600 dark:text-gray-300 hover:text-second dark:hover:text-primary"
          >
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
