"use client";
import React from "react";
import Image from "next/image";
import { joinClassNames, getStatusStyle } from "@/app/utils/helpers";
import { useSelector } from "react-redux";
import { selectEditStyle } from "@/lib/features/userSlice";
import {
  selectIsEditing,
  selectSelectedSubject,
} from "@/lib/features/subjectsSlice";

interface RegularRowProps {
  key: number;
  subject: Subject;
  handleEdit: (selected: Subject) => void;
}

const actionColumnStyle = {
  transition: "width 0.5s ease-in-out",
  overflow: "hidden",
};

const RegularRow = ({ subject, handleEdit }: RegularRowProps) => {
  const editStyle = useSelector(selectEditStyle);
  const isEditing = useSelector(selectIsEditing);
  const selectedSubject = useSelector(selectSelectedSubject);

  return (
    <tr
      key={subject.code}
      className={`${
        isEditing && !selectedSubject && subject.status === "No disponible"
          ? "text-gray-400"
          : ""
      }${
        isEditing && !selectedSubject && subject.status !== "No disponible"
          ? "hover:text-second cursor-pointer"
          : ""
      } 
        ${
          isEditing && selectedSubject && subject.status !== "No disponible"
            ? "cursor-pointer dark:hover:bg-slate-800 hover:bg-gray-300"
            : ""
        } ${
        isEditing && selectedSubject && subject.status === "No disponible"
          ? "text-gray-400"
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
      <td className="border-b dark:border-gray-700 p-4">
        <div className="flex">
          <div className="w-full">
            {subject.finalGrade ? subject.finalGrade : "-"}
          </div>
          <Image
            src="/chevron-down-white.svg"
            alt="Dropdown status"
            width={0}
            height={0}
            className="cursor-pointer duration-350"
          />
        </div>
      </td>
      <td className={"border-b dark:border-gray-700 p-4"}>
        <>
          <button
            className={joinClassNames(
              getStatusStyle(subject.status),
              "rounded-md py-1 shadow-lg text-gray-200 flex duration-350 hover:cursor-pointer w-40"
            )}
          >
            <p className="w-full">{subject.status}</p>
            <Image
              src="/chevron-down-white.svg"
              alt="Dropdown status"
              width={23}
              height={23}
              style={{
                width: isEditing ? "23px" : "0px",
                height: "23px",
              }}
              className="duration-350 mr-5"
            />
          </button>
        </>
      </td>
      {isEditing && editStyle === "Fast" && (
        <td style={actionColumnStyle} className="border-b dark:border-gray-700">
          <div className="flex justify-center items-center">
            <button onClick={() => {}}>
              <Image
                src="/check-disabled.svg"
                alt="Confirm"
                width={25}
                height={25}
              />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default RegularRow;
