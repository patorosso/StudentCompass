"use client";
import React, { useState } from "react";
import Image from "next/image";
import Menu from "../../Menu";
import { joinClassNames, getStatusStyleWithRipple } from "@/app/utils/helpers";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import {
  setSelectedSubject,
  selectIsEditing,
  updateGradeSelectedSubject,
  updateStatusSelectedSubject,
} from "@/lib/features/subjectsSlice";
import { toast } from "react-toastify";

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
    if (!validateGradeAndStatus()) return;
    setShowGradeMenu(false);
    setShowStatusMenu(false);
    handleConfirmEdit();
  };

  const handleResetRowEdit = () => {
    setShowGradeMenu(false);
    setShowStatusMenu(false);
    dispatch(setSelectedSubject(undefined));
  };

  const validateGradeAndStatus = () => {
    if (!selectedSubject) return;

    if (
      (selectedSubject.finalGrade === null || selectedSubject.finalGrade < 4) &&
      selectedSubject.status === "Aprobada"
    ) {
      toast.error("Una materia aprobada necesita una nota igual ó mayor a 4.");
      return false;
    }

    if (
      selectedSubject.status !== "Aprobada" &&
      selectedSubject.finalGrade !== null
    ) {
      toast.error(
        "Una materia disponible ó en curso no puede tener una nota asignada."
      );
      return false;
    }

    return true;
  };

  return (
    <tr
      key={selectedSubject.code}
      onClick={() => handleEdit(selectedSubject)}
      className="bg-slate-200 dark:bg-slate-500"
    >
      <td className="border-b dark:border-gray-700 p-4">
        {selectedSubject.code}
      </td>
      <td
        className={`border-b dark:border-gray-700 p-4 ${
          selectedSubject.description.length > 25 ? "text-sm" : ""
        }`}
      >
        {selectedSubject.description}
      </td>
      <td className="border-b dark:border-gray-700 p-4 ">
        {selectedSubject.weeklyHours}hs
      </td>

      <td className="border-b dark:border-gray-700 p-4 pr-10">
        <div
          className="flex relative"
          onClick={() => setShowGradeMenu(!showGradeMenu)}
        >
          <div className="w-full text-center">
            {selectedSubject.finalGrade ? selectedSubject.finalGrade : "-"}
          </div>
          <Image
            src="/chevron-down-white.svg"
            alt="Dropdown status"
            width={23}
            height={23}
            className="cursor-pointer"
          />
          {showGradeMenu && (
            <Menu
              values={["-", "4", "5", "6", "7", "8", "9", "10"].filter(
                (x) => x !== selectedSubject.finalGrade?.toString()
              )}
              minWidth="min-w-10"
              maxWidth="max-w-50"
              onClick={handleUpdateGrade}
              onClose={() => setShowGradeMenu(false)}
            />
          )}
        </div>
      </td>
      <td className={"border-b dark:border-gray-700 p-4 "}>
        <div className="flex relative">
          <button
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className={joinClassNames(
              getStatusStyleWithRipple(selectedSubject.status),
              "rounded-md py-1 px-2 w-36 shadow-lg text-gray-200 flex duration-350 select-none"
            )}
          >
            <p className="w-full duration-350">{selectedSubject.status}</p>
            <Image
              src="/chevron-down-white.svg"
              alt="Dropdown status"
              width={23}
              height={23}
              style={{
                width: isEditing ? "23px" : "0px",
                height: "23px",
                opacity: isEditing ? 1 : 0,
                transition: "width 350ms ease, opacity 350ms ease",
              }}
              className="duration-350"
            />
          </button>
          {showStatusMenu && (
            <Menu
              onClose={() => setShowStatusMenu(false)}
              values={["Disponible", "Cursando", "Aprobada"].filter(
                (x) => x !== selectedSubject.status
              )}
              maxWidth="max-width-40"
              minWidth="min-w-36"
              onClick={handleUpdateStatus}
            />
          )}
        </div>
      </td>
      {isEditing && (
        <td style={actionColumnStyle} className="border-b dark:border-gray-700">
          <div className="flex items-center justify-around duration-350">
            <button
              onClick={() => prepareHandleConfirmEdit()}
              className="flex justify-center items-center w-8 h-8 bg-success hover:bg-green-500 rounded-full"
            >
              <Image
                src="/check.svg"
                alt="Confirm edit"
                width={21}
                height={21}
                className="invert"
              />
            </button>
            <button
              onClick={() => handleResetRowEdit()}
              className="flex justify-center items-center w-8 h-8 bg-cancel hover:bg-red-700 rounded-full"
            >
              <Image
                src="/cancel.svg"
                alt="Cancel edit"
                width={26}
                height={26}
                className="invert"
              />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default SelectedRow;
