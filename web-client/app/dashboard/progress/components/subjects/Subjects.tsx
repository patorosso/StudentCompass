import React from "react";
import SubjectsActions from "./actions/SubjectsActions";
import SubjectsTable from "./SubjectsTable";

const Subjects = () => {
  return (
    <div
      className="bg-gray-400 dark:bg-surface-300 bg-opacity-55 dark:bg-opacity-55 dark:text-white shadow-xl rounded-lg p-4"
      style={{ width: 920 }}
    >
      <div className="flex justify-between pb-4">
        <h2 className="text-center text-slate-800 dark:text-white text-2xl my-1 pl-4">
          Lista de materias
        </h2>
        <SubjectsActions />
      </div>
      <SubjectsTable />
    </div>
  );
};

export default Subjects;
