import React from "react";
import CurrentSubjectsTable from "./CurrentSubjectsTable";
import CurrentSubjectsActions from "./actions/CurrentSubjectsActions";

const CurrentSubjects = () => {
  return (
    <div className="relative bg-slate-400 bg-opacity-55 dark:bg-surface-300 dark:bg-opacity-55 text-white shadow-xl rounded-lg p-4 md:col-span-3">
      <div className="">
        <div className="flex justify-between">
          <h2 className="text-center text-slate-800 dark:text-white text-2xl my-1 pl-4">
            Materias en curso
          </h2>
          <CurrentSubjectsActions />
        </div>
        <CurrentSubjectsTable />
      </div>
    </div>
  );
};

export default CurrentSubjects;
