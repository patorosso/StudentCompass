"use client";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectAvailableSubjects } from "@/lib/features/subjectsSlice";
import AddCurrentSubject from "./AddCurrentSubject";

const CurrentSubjectsActions = () => {
  const availableSubjects = useSelector(selectAvailableSubjects);

  return (
    <div className="flex">
      <AddCurrentSubject availableSubjects={availableSubjects} />
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

export default CurrentSubjectsActions;
