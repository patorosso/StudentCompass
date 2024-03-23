"use client";
import React from "react";
import Image from "next/image";

const CurrrentSubjects = ({ subjects }: SubjectRowProps) => {
  return (
    <div
      className="px-4  h-80" //overflow-auto custom-scrollbar
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
          {subjects.map((subject) => (
            <tr key={subject.code} className="cursor-pointer hover:text-second">
              <td className="border-b dark:border-gray-700 p-4">
                {subject.description}
              </td>
              <td className="border-b dark:border-gray-700 p-4">
                {subject.finalGrade ? subject.finalGrade : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {subjects.length === 0 && (
        <div className="flex flex-col items-center pt-16">
          <button
            onClick={() => {}}
            className="bg-surface-300 hover:bg-surface-400 text-gray-500 rounded-full w-20 h-20 flex items-center justify-center select-none opacity-50 hover:opacity-100"
          >
            <Image
              src="/add.svg"
              alt="Toggle Sidebar"
              width={48}
              height={48}
              className="invert"
            />
          </button>
          <div className="pt-4">Agregar</div>
        </div>
      )}
    </div>
  );
};

export default CurrrentSubjects;
