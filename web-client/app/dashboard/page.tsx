"use client";
import React from "react";
import { useRouter } from "next/navigation";

const DashboardRoot = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/progress?studentId=1&careerPlanId=1");
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-96 h-72 bg-gray-400 dark:bg-surface-300 bg-opacity-55 dark:bg-opacity-55 dark:text-white shadow-xl rounded-lg flex items-center justify-center">
        <button onClick={() => handleClick()}>Elegir carrera</button>
      </div>
    </div>
  );
};

export default DashboardRoot;
