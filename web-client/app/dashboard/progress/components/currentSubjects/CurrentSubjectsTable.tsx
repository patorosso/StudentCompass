"use client";
import React from "react";
import { selectInProgressSubjects } from "@/lib/features/subjectsSlice";
import { useSelector } from "react-redux";

const CurrentSubjectsTable = () => {
  const currentSubjects = useSelector(selectInProgressSubjects);

  return (
    <div
      className="px-4 min-h-96" //overflow-auto custom-scrollbar
    >
      <table className="min-w-full border-collapse">
        <thead className="text-left text-sm text-white sticky top-0 border-b-[1px]">
          <tr>
            <th className="py-4">Descripción</th>
            <th className="py-4">1°</th>
            <th className="py-4">2°</th>
            <th className="py-4">Rec.</th>
            <th className="py-4">Final</th>
          </tr>
        </thead>
        <tbody>
          {currentSubjects.map((subject) => (
            <tr key={subject.code} className="cursor-pointer hover:text-second">
              <td className="border-b dark:border-gray-700 py-4 text-sm">
                {subject.description}
              </td>
              <td className="border-b dark:border-gray-700 py-4 text-sm">
                {subject.exams &&
                  subject.exams
                    .filter((grade) => grade.description === "Primer parcial")
                    .at(-1)?.grade}
              </td>
              <td className="border-b dark:border-gray-700 py-4 text-sm">
                {subject.exams &&
                  subject.exams
                    .filter((grade) => grade.description === "Segundo parcial")
                    .at(-1)?.grade}
              </td>
              <td className="border-b dark:border-gray-700 py-4 text-sm">
                {subject.exams &&
                  subject.exams
                    .filter((grade) => grade.description === "Recuperatorio")
                    .at(-1)?.grade}
              </td>
              <td className="border-b dark:border-gray-700 py-4 text-sm">
                {subject.exams &&
                  subject.exams
                    .filter((grade) => grade.description === "Final")
                    .at(-1)?.grade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentSubjects.length === 0 && (
        <div className="flex flex-col items-center pt-32">
          No hay materias en curso.
        </div>
      )}
    </div>
  );
};

export default CurrentSubjectsTable;
