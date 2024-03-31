"use client";
import React from "react";
import Image from "next/image";

const SubjectsActions = () => {
  return (
    <button
      onClick={() => {}}
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
  );
};

export default SubjectsActions;
