import React from "react";
import SubjectRows from "./SubjectRows";
import SubjectListTop from "./SubjectListTop";

const SubjectsList = () => {
  return (
    <div
      className="bg-gray-400 dark:bg-surface-300 bg-opacity-55 dark:bg-opacity-55 dark:text-white shadow-xl rounded-lg p-4"
      style={{ width: 920 }}
    >
      <SubjectListTop />
      <div
        className="overflow-auto custom-scrollbar pr-4"
        style={{ height: 610 }}
      >
        <table className="min-w-full border-collapse">
          <thead className="text-left text-white sticky top-0 bg-gray-600">
            <tr>
              <th className="p-4 rounded-l-lg">Código</th>
              <th className="p-4">Descripción</th>
              <th className="p-4">Nota</th>
              <th className="p-4">Horas</th>
              <th className="px-5 py-4 rounded-r-lg">Estado</th>
            </tr>
          </thead>
          <tbody>
            <SubjectRows />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectsList;
