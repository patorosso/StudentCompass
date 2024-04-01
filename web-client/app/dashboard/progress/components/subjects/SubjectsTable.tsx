import React from "react";
import SubjectsRows from "./SubjectsRows";
import SubjectsColumns from "./SubjectsColumns";

const SubjectsTable = () => {
  return (
    <div
      className="overflow-auto custom-scrollbar pr-4"
      style={{ height: 610 }}
    >
      <table className="min-w-full border-collapse">
        <SubjectsColumns />
        <SubjectsRows />
      </table>
    </div>
  );
};

export default SubjectsTable;
