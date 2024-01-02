"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const ThemeToggler = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="focus:outline-none transition ease-in-out duration-300 dark:invert select-none"
    >
      <div
        className={`w-6 h-6 transition-transform duration-500 ${
          darkMode ? "rotate-0" : "rotate-180"
        }`}
      >
        <Image
          src="/circle-half.svg"
          alt="Toggle Theme"
          width={24}
          height={24}
        />
      </div>
    </button>
  );
};

export default ThemeToggler;
