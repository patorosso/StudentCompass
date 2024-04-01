import React from "react";
import SubjectsRows from "./SubjectsRows";

const SubjectsTable = () => {
  return (
    <div
      className="overflow-auto custom-scrollbar pr-4"
      style={{ height: 610 }}
    >
      <table className="min-w-full border-collapse">
        <thead className="text-left text-white sticky top-0 bg-gray-600">
          <tr>
            <th className="p-4">Código</th>
            <th className="p-4 w-80">Descripción</th>
            <th className="p-4">Horas</th>
            <th className="p-4">Nota</th>
            <th className="px-5 py-4">Estado</th>
          </tr>
        </thead>
        <SubjectsRows />
      </table>
    </div>
  );
};

export default SubjectsTable;
