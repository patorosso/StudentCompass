import React, { useEffect, useRef, useState } from "react";

interface MenuProps {
  onClick: (value: string) => void;
  onClose?: () => void;
  values: string[];
  title?: string;
  maxWidth: string;
  minWidth?: string;
  optionalMargin?: string;
}

const Menu = ({
  title,
  onClick,
  onClose,
  values,
  optionalMargin,
  maxWidth,
  minWidth,
}: MenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuDirection, setMenuDirection] = useState("down");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkMenuPosition = () => {
      if (!menuRef.current) return;

      const menuRect = menuRef.current.getBoundingClientRect();
      const bottomSpace = window.innerHeight - menuRect.top - menuRect.height;
      const topSpace = menuRect.top;

      if (bottomSpace < 200 && topSpace > 200) {
        // Assuming the height of the menu is around 120px
        setMenuDirection("up");
      } else {
        setMenuDirection("down");
      }

      setIsReady(true); // Ensure the menu is ready to be transitioned in
    };

    // Delay the check slightly to ensure the menu is in the DOM
    setTimeout(checkMenuPosition, 10);
    window.addEventListener("resize", checkMenuPosition);

    return () => {
      window.removeEventListener("resize", checkMenuPosition);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      className={`absolute ${
        menuDirection === "up" ? "bottom-full mb-[5px]" : "top-full mt-[10px]"
      }
        origin-center ${maxWidth} ${minWidth} ${optionalMargin} rounded-md shadow-2xl bg-slate-200 dark:bg-gray-500 divide-gray-100 z-20 transition-all duration-350 ease-in-out text-black dark:text-white`}
      style={{
        transform: isReady ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: menuDirection === "up" ? "bottom" : "top",
        maxHeight: isReady ? "200px" : "0",
      }}
      ref={menuRef}
    >
      <div className="max-h-52 overflow-y-auto">
        {title && (
          <div className="flex border-b-2 border-slate-300 px-4">
            <p className="text-gray-700 block py-2 text-md">{title}</p>
          </div>
        )}
        {values.map((value) => (
          <button
            key={value}
            className="block px-4 py-2 text-md w-full text-center hover:bg-gray-300 dark:hover:bg-gray-400"
            onClick={(event) => {
              onClick(value);
              onClose?.();
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
