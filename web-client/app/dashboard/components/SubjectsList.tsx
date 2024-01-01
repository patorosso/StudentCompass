import React from "react";

const SubjectsList = async () => {
  const res = await fetch(
    "http://localhost:5177/api/Dashboard?studentId=1&careerPlanId=1"
  );
  const subjects: Subject[] = await res.json();

  return (
    <div>
      <div
        className="bg-gray-400 dark:bg-surface-200 text-white shadow-xl rounded-lg p-4"
        style={{ width: 920 }}
      >
        <div
          className="overflow-auto custom-scrollbar pr-4"
          style={{ height: 670 }}
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
                <tr
                  key={subject.code}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <td className="border-b dark:border-gray-700 p-4">
                    {subject.code}
                  </td>
                  <td className="border-b dark:border-gray-700 p-4">
                    {subject.description}
                  </td>
                  <td className="border-b dark:border-gray-700 p-4">
                    {subject.finalGrade ? subject.finalGrade : "-"}
                  </td>
                  <td className="border-b dark:border-gray-700 p-4">
                    {subject.weeklyHours}
                  </td>
                  <td className="border-b dark:border-gray-700 p-4">
                    {subject.isAvailable ? "Yes" : "No"}
                  </td>
                  <td className="border-b dark:border-gray-700 p-4">
                    {subject.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubjectsList;
