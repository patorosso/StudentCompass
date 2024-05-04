import React from "react";
import SubjectsRows from "./SubjectsRows";
import SubjectsColumns from "./SubjectsColumns";
import DetailedEdit from "./actions/DetailedEdit";

const SubjectsTable = () => {
  return (
    <div
      className="overflow-auto custom-scrollbar pr-4"
      style={{ height: 580 }}
    >
      <table className="min-w-full border-collapse">
        <SubjectsColumns />
        <SubjectsRows />
      </table>
      <DetailedEdit />
    </div>
  );
};

export default SubjectsTable;
