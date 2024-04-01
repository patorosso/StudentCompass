"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { useSelector } from "react-redux";
import { selectPreferences, setEditStyle } from "@/lib/features/userSlice";

const SubjectsMenu = () => {
  const dispatch = useAppDispatch();
  const preferences = useSelector(selectPreferences);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuVisible(false);
      }
    };

    if (isMenuVisible)
      document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuVisible]);

  const onEditClick = (style: "Fast" | "Detailed") => {
    dispatch(setEditStyle(style));
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="bg-surface-300 hover:bg-surface-400 text-gray-500 rounded-full w-9 h-9 flex items-center justify-center select-none"
      >
        <Image
          src="/menu.svg"
          alt="Toggle Sidebar"
          width={5}
          height={5}
          className="invert"
        />
      </button>
      {isMenuVisible && (
        <div
          className="origin-top-right absolute left-7 mt-2 w-48 rounded-sm shadow-2xl bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
          ref={menuRef}
        >
          <div className="py-1" role="none">
            <div className="flex border-b-2 border-slate-300 px-4">
              <Image
                src="/edit.svg"
                alt="Toggle Sidebar"
                width={20}
                height={20}
              />
              <p className="text-gray-700 block px-4 py-2 text-sm">Edición</p>
            </div>
            <button
              className={`${
                preferences.editStyle === "Fast"
                  ? "text-second"
                  : "text-gray-700 hover:bg-gray-300"
              } block px-4 py-2 text-sm w-full text-left `}
              role="menuitem"
              tabIndex={-1}
              onClick={() => onEditClick("Fast")}
              disabled={preferences.editStyle === "Fast"}
            >
              Rápida
            </button>
            <button
              className={`${
                preferences.editStyle === "Detailed"
                  ? "text-second"
                  : "text-gray-700 hover:bg-gray-300"
              } block px-4 py-2 text-sm w-full text-left border-b-2 border-black`}
              role="menuitem"
              tabIndex={-1}
              onClick={() => onEditClick("Detailed")}
            >
              Detallada
            </button>
          </div>
          <div className="py-1" role="none">
            <div className="flex border-b-2 border-slate-300 px-4">
              <Image
                src="/edit.svg"
                alt="Toggle Sidebar"
                width={20}
                height={20}
              />
              <p className="text-gray-700 block px-4 py-2 text-sm">Orden</p>
            </div>
            <button
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300 w-full text-left"
              role="menuitem"
              tabIndex={-1}
            >
              Código
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectsMenu;
