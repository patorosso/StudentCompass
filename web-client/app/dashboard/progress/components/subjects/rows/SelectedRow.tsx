"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Menu from "../../Menu";
import { joinClassNames, getStatusStyleWithRipple } from "@/app/utils/helpers";
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
  const [chevronWidthGrow, setChevronWidthGrow] = useState(false);

  useEffect(() => {
    setChevronWidthGrow(true);
  }, []);

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
      className={`${isEditing ? " text-second" : "hover:text-second "} `}
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
            style={{
              width: chevronWidthGrow ? "23px" : "0px",
            }}
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
          <button
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className={joinClassNames(
              getStatusStyleWithRipple(selectedSubject.status),
              "rounded-md py-1 shadow-lg text-gray-200 flex duration-350 hover:cursor-pointer w-40"
            )}
          >
            {showStatusMenu && (
              <Menu
                values={["Disponible", "Cursando", "Aprobada"]}
                maxWidth="max-width-40"
                onClick={handleUpdateStatus}
              />
            )}
            <p className="w-full">{selectedSubject.status}</p>
            <Image
              src="/chevron-down-white.svg"
              alt="Dropdown status"
              width={23}
              height={23}
              style={{
                width: chevronWidthGrow ? "23px" : "0px",
                height: "23px",
              }}
              className="duration-350 mr-5"
            />
          </button>
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
