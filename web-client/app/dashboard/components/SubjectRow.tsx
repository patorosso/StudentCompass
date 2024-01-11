"use client";
import React from "react";

const SubjectRow = ({ subject, key }: SubjectRowProps) => {
  return (
    <tr
      key={key}
      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
    >
      <td className="border-b dark:border-gray-700 p-4">{subject.code}</td>
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
      <td className="border-b dark:border-gray-700 p-4">{subject.status}</td>
    </tr>
  );
};

export default SubjectRow;
