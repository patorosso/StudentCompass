import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/30 backdrop-blur-md  border-gray-400 border-b-[1px] ">
      <nav className="flex items-center justify-between max-w-6xl mx-auto py-4 px-4 h-full">
        <Link
          href="/"
          className="text-xl font-semibold text-gray-700 hover:text-white transition-colors"
        >
          Student Compass
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-white transition-colors"
          >
            Me
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-white transition-colors"
          >
            About us
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
