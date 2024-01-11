import React from "react";
import SubjectRow from "./SubjectRow";

const SubjectsList = async () => {
  const res = await fetch(
    "http://localhost:5177/api/Dashboard?studentId=1&careerPlanId=1"
  );
  const subjects: Subject[] = await res.json();

  return (
    <div>
      <div
        className="bg-gray-400 dark:bg-surface-200 dark:text-white shadow-xl rounded-lg p-4"
        style={{ width: 920 }}
      >
        <div
          className="overflow-auto custom-scrollbar pr-4"
          style={{ height: 640 }}
        >
          <table className="min-w-full border-collapse text-sm">
            <thead className="text-left text-xs text-gray-500 sticky top-0 bg-gray-400 dark:bg-surface-200">
              <tr>
                <th className="p-4">Code</th>
                <th className="p-4">Description</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Hours</th>
                <th className="p-4">Available</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <SubjectRow key={subject.code} subject={subject} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubjectsList;
