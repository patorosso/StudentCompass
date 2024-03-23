import React from "react";
import SubjectRows from "./SubjectRows";

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
        <div
          className="overflow-auto custom-scrollbar pr-4"
          style={{ height: 640 }}
        >
          <table className="min-w-full border-collapse">
            <thead className="text-left text-white sticky top-0 bg-gray-600">
              <tr>
                <th className="p-4 rounded-l-lg">Code</th>
                <th className="p-4">Description</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Hours</th>
                <th className="p-4">Available</th>
                <th className="p-4 rounded-r-lg">Status</th>
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
