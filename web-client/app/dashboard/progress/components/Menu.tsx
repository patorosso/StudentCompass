"use client";
import React, { useRef } from "react";

interface MenuProps {
  onClick: (value: string) => void;
  values: string[];
  title: string;
  maxWidth: string;
}

const Menu = ({ title, onClick, values, maxWidth }: MenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={`absolute origin-center mt-10 ${maxWidth} rounded-sm shadow-2xl bg-white ring-1 ring-black ring-opacity-5  divide-gray-100 z-50`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
      ref={menuRef}
    >
      <div className="py-1 max-h-52 overflow-y-auto" role="none">
        <div className="flex border-b-2 border-slate-300 px-4">
          <p className="text-gray-700 block py-2 text-md">{title}</p>
        </div>
        {values.map((value) => (
          <button
            key={value}
            className={`block px-4 py-2 text-md w-full text-center hover:bg-gray-300`}
            role="menuitem"
            tabIndex={-1}
            onClick={() => onClick(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
