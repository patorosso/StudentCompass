"use client";
import React from "react";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { useSelector } from "react-redux";
import {
  selectIsEditing,
  setDetailedModal,
  setSelectedSubject,
} from "@/lib/features/subjectsSlice";
import { joinClassNames, getStatusStyle } from "@/app/utils/helpers";
interface DetailedEditRowsProps {
  subjects: Subject[];
}

const DetailedEditRows = ({ subjects }: DetailedEditRowsProps) => {
  const dispatch = useAppDispatch();
  const isEditing = useSelector(selectIsEditing);

  const handleEdit = (clickedSubject: Subject | undefined) => {
    if (!isEditing) return;
    if (clickedSubject?.status === "No disponible") return;
    //if (clickedSubject?.code === selectedSubject?.code) return;

    dispatch(setSelectedSubject(clickedSubject));
    dispatch(setDetailedModal(true));
  };

  return (
    <>
      {subjects.map((subject) => (
        <tr
          key={subject.code}
          className={`${
            isEditing && subject.status === "No disponible"
              ? "text-gray-400"
              : ""
          } ${
            isEditing && subject.status !== "No disponible"
              ? "hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800"
              : ""
          } `}
          onClick={() => handleEdit(subject)}
        >
          <td className="border-b dark:border-gray-700 p-4">{subject.code}</td>
          <td
            className={`border-b dark:border-gray-700 p-4 ${
              subject.description.length > 25 ? "text-sm" : ""
            }`}
          >
            {subject.description}
          </td>
          <td className="border-b dark:border-gray-700 p-4">
            {subject.weeklyHours}hs
          </td>
          <td className="border-b dark:border-gray-700 p-4 pr-10">
            <div className="flex">
              <div className="w-full text-center">
                {subject.finalGrade ? subject.finalGrade : "-"}
              </div>
            </div>
          </td>
          <td className={"border-b dark:border-gray-700 p-4"}>
            <>
              <button
                disabled={!isEditing}
                className={joinClassNames(
                  getStatusStyle(subject.status),
                  "rounded-md py-1 shadow-lg text-gray-200 flex duration-350 w-36"
                )}
              >
                <p className="w-full">{subject.status}</p>
              </button>
            </>
          </td>
        </tr>
      ))}
    </>
  );
};

export default DetailedEditRows;
