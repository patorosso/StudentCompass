"use client";
import React from "react";
import SubjectsMenu from "./SubjectsMenu";
import EditSubject from "./EditSubject";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  selectIsEditing,
  setEditingFalse,
  updateSubjects,
  selectSubjectsToUpdate,
} from "@/lib/features/subjectsSlice";
import { useAppDispatch } from "@/lib/hooks";

const SubjectsActions = () => {
  const dispatch = useAppDispatch();
  const isEditing = useSelector(selectIsEditing);
  const subjectsToUpdate = useSelector(selectSubjectsToUpdate);
  const isSaveDisabled = subjectsToUpdate.length === 0;

  const onCancelEditClick = () => {
    dispatch(setEditingFalse());
  };

  const onSaveEditClick = () => {
    dispatch(updateSubjects(subjectsToUpdate));
  };

  return (
    <div className="flex">
      <EditSubject />
      <div
        className="flex duration-350 ease-in-out"
        style={{ width: isEditing ? "100px" : "0" }}
      >
        <button
          id="edit-button"
          onClick={() => onSaveEditClick()}
          disabled={isSaveDisabled}
          className={`bg-success ${
            isSaveDisabled
              ? "bg-success opacity-40"
              : "bg-success hover:bg-green-400"
          } text-gray-500 rounded-full w-9 h-9 flex items-center justify-center select-none mr-3`}
        >
          <Image src="/save.svg" alt="Save edit" width={20} height={20} />
        </button>
        <button
          id="cancel-button"
          onClick={() => onCancelEditClick()}
          className="bg-cancel hover:bg-red-700 text-gray-500 rounded-full w-9 h-9 flex items-center justify-center select-none"
        >
          <Image
            src="/cancel.svg"
            alt="Cancel edit"
            width={30}
            height={30}
            className="invert"
          />
        </button>
      </div>
      <SubjectsMenu />
    </div>
  );
};

export default SubjectsActions;
