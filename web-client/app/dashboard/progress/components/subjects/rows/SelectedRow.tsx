"use client";
import React, { useState } from "react";
import Image from "next/image";
import Menu from "../../Menu";
import { joinClassNames, getStatusStyle } from "@/app/utils/helpers";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import {
  selectIsEditing,
  updateGradeSelectedSubject,
  updateStatusSelectedSubject,
} from "@/lib/features/subjectsSlice";

type SelectedRowProps = {
  key: number;
  selectedSubject: Subject;
  handleEdit: (selected: Subject) => void;
  handleConfirmEdit: () => void;
};

const actionColumnStyle = {
  transition: "width 0.5s ease-in-out",
  overflow: "hidden",
};

const SelectedRow = ({
  selectedSubject,
  handleEdit,
  handleConfirmEdit,
}: SelectedRowProps) => {
  const dispatch = useAppDispatch();
  const isEditing = useSelector(selectIsEditing);
  const [showGradeMenu, setShowGradeMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const handleUpdateGrade = (value: string) => {
    if (selectedSubject === undefined) return;
    dispatch(updateGradeSelectedSubject(value));
    setShowGradeMenu(false);
  };

  const handleUpdateStatus = (value: string) => {
    if (selectedSubject === undefined) return;
    dispatch(updateStatusSelectedSubject(value));
    setShowStatusMenu(false);
  };

  const prepareHandleConfirmEdit = () => {
    setShowGradeMenu(false);
    setShowStatusMenu(false);
    handleConfirmEdit();
  };

  return (
    <tr
      key={selectedSubject.code}
      className={`${isEditing ? " text-second" : "hover:text-second"}`}
      onClick={() => handleEdit(selectedSubject)}
    >
      <td className="border-b dark:border-gray-700 p-4 bg-slate-900">
        {selectedSubject.code}
      </td>
      <td
        className={`border-b dark:border-gray-700 p-4 bg-slate-900 ${
          selectedSubject.description.length > 25 ? "text-sm" : ""
        }`}
      >
        {selectedSubject.description}
      </td>
      <td className="border-b dark:border-gray-700 p-4 bg-slate-900">
        {selectedSubject.weeklyHours}hs
      </td>

      <td className="border-b dark:border-gray-700 p-4 max-width-6 bg-slate-900">
        <div className="flex">
          <div className="w-full">
            {selectedSubject.finalGrade ? selectedSubject.finalGrade : "-"}
          </div>
          <Image
            src="/chevron-down-white.svg"
            alt="Dropdown status"
            width={20}
            height={20}
            className="cursor-pointer duration-350"
            onClick={() => setShowGradeMenu(!showGradeMenu)}
          />
          {showGradeMenu && (
            <Menu
              values={["-", "4", "5", "6", "7", "8", "9", "10"]}
              maxWidth="max-width-20"
              onClick={handleUpdateGrade}
            />
          )}
        </div>
      </td>
      <td className={"border-b dark:border-gray-700 p-4 bg-slate-900"}>
        <>
          <div className="flex relative">
            <div
              className={joinClassNames(
                getStatusStyle(selectedSubject.status),
                "rounded-md py-1 text-center shadow-lg text-gray-200 w-full"
              )}
            >
              {selectedSubject.status}
            </div>
            <Image
              src="/chevron-down-white.svg"
              alt="Dropdown status"
              width={5}
              height={5}
              className="ml-2 cursor-pointer duration-350"
              onClick={() => setShowStatusMenu(!showStatusMenu)}
            />
            {showStatusMenu && (
              <Menu
                values={["Disponible", "Cursando", "Aprobada"]}
                maxWidth="max-width-40"
                onClick={handleUpdateStatus}
              />
            )}
          </div>
        </>
      </td>
      {isEditing && (
        <td
          style={actionColumnStyle}
          className="border-b dark:border-gray-700 bg-slate-900"
        >
          <div className="flex justify-center items-center">
            <button onClick={() => prepareHandleConfirmEdit()}>
              <Image
                src="/check-enabled.svg"
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

export default SelectedRow;
