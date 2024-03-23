"use client";
import React, { useState } from "react";
import SpecialSubjectTable from "./SpecialSubjectTable";
import Image from "next/image";

const tableTitles = [
  "Transversal subjects",
  "Elective subjects",
  "Optional subjects",
];

const SpecialSubjects = () => {
  const [activeTableIndex, setActiveTableIndex] = useState(0);

  return (
    <div className="relative bg-gray-500 bg-opacity-55 dark:bg-surface-300 dark:bg-opacity-55 text-white shadow-xl rounded-lg p-4 md:col-span-3">
      <div className="flex justify-between">
        <button
          onClick={() =>
            setActiveTableIndex(
              (activeTableIndex - 1 + tableTitles.length) % tableTitles.length
            )
          }
          className="bg-surface-300 hover:bg-surface-400 rounded-full w-9 h-9 flex items-center justify-center select-none"
        >
          <Image
            src="/chevron-left.svg"
            alt="Toggle Sidebar"
            width={14}
            height={14}
            className="invert"
          />
        </button>
        <h2 className="text-center text-black dark:text-white text-xl my-1">
          {tableTitles[activeTableIndex]}
        </h2>
        <button
          onClick={() =>
            setActiveTableIndex((activeTableIndex + 1) % tableTitles.length)
          }
          className="bg-surface-300 hover:bg-surface-400 text-gray-500 rounded-full w-9 h-9 flex items-center justify-center select-none"
        >
          <Image
            src="/chevron-left.svg"
            alt="Toggle Sidebar"
            width={14}
            height={14}
            className="invert rotate-180"
          />
        </button>
      </div>

      <div className="overflow-hidden h-64">
        <div
          className="whitespace-nowrap transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeTableIndex * 100}%)`,
          }}
        >
          {tableTitles.map((title, index) => (
            <div key={title} className="inline-block w-full h-full">
              <SpecialSubjectTable subjects={[]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialSubjects;
