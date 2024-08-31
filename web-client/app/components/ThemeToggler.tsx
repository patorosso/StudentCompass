"use client";
import React from "react";
import Image from "next/image";
import { useColorScheme } from "@mui/material";

const ThemeToggler = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  return (
    <button
      onClick={() => (mode === "light" ? setMode("dark") : setMode("light"))}
      className="focus:outline-none transition ease-in-out duration-300 dark:invert select-none"
    >
      <div
        className={`w-6 h-6 transition-transform duration-500 ${
          mode === "dark" ? "rotate-0" : "rotate-180"
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
