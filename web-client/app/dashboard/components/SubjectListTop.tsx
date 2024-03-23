"use client";
import React from "react";
import Image from "next/image";

const SubjectListTop = () => {
  return (
    <div className="flex justify-between pb-4">
      <h2 className="text-center text-black dark:text-white text-2xl my-1 pl-4">
        Lista de materias
      </h2>
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
    </div>
  );
};

export default SubjectListTop;
