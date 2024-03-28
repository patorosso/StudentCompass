import React from "react";
import SubjectsList from "./components/SubjectsList";
import Analytics from "./components/Analytics";

const Dashboard = () => {
  return (
    <div>
      <div className="flex items-center px-4 h-20 dark:bg-slate-900 bg-slate-300 opacity-90 border-gray-400 dark:border-gray-500 border-b-[1px]">
        <p className="text-3xl dark:text-white">
          Ingeniería en Informática - Plan 2023
        </p>
      </div>
      <div className="flex flex-col justify-center items-center s2ml:flex-row s2ml:justify-evenly mt-14">
        <SubjectsList />
        <Analytics />
      </div>
    </div>
  );
};

export default Dashboard;
