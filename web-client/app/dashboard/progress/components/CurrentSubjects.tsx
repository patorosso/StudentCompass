"use client";
import React, { use } from "react";
import Image from "next/image";
import CurrentSubjectRows from "./CurrentSubjectRows";
import { useSelector } from "react-redux";
import { selectAvailableSubjects } from "@/lib/features/subjectsSlice";

const CurrentSubjects = () => {
  const availableSubjects = useSelector(selectAvailableSubjects);

  return (
    <div className="relative bg-gray-500 bg-opacity-55 dark:bg-surface-300 dark:bg-opacity-55 text-white shadow-xl rounded-lg p-4 md:col-span-3">
      <div className="">
        <div className="flex justify-between">
          <h2 className="text-center text-black dark:text-white text-2xl my-1 pl-4">
            Materias en curso
          </h2>
          <div className="flex">
            <button
              onClick={() => {}}
              className="bg-surface-300 hover:bg-surface-400 text-gray-500 rounded-full w-9 h-9 flex items-center justify-center select-none mr-3"
            >
              <Image
                src="/add.svg"
                alt="Toggle Sidebar"
                width={19}
                height={19}
                className="invert"
              />
            </button>
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
        </div>
        <CurrentSubjectRows />
      </div>
    </div>
  );
};

export default CurrentSubjects;
