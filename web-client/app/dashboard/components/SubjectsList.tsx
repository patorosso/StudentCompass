import React from "react";
import SubjectRows from "./SubjectRows";
import SubjectListTop from "./SubjectListTop";

const SubjectsList = async () => {
  const res = await fetch(
    "http://localhost:5177/api/Dashboard?studentId=1&careerPlanId=1"
  );
  const subjects: Subject[] = await res.json();

  return (
    <div>
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
                <th className="p-4">Disponible</th>
                <th className="p-4 rounded-r-lg">Estado</th>
              </tr>
            </thead>
            <tbody>
              <SubjectRows subjects={subjects} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubjectsList;
