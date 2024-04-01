"use client";
import React from "react";
import SubjectsMenu from "./SubjectsMenu";
import EditSubject from "./EditSubject";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectIsEditing, setEditingFalse } from "@/lib/features/subjectsSlice";
import { useAppDispatch } from "@/lib/hooks";

const SubjectsActions = () => {
  const dispatch = useAppDispatch();
  const isEditing = useSelector(selectIsEditing);

  const onCancelClick = () => {
    dispatch(setEditingFalse());
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
          onClick={() => {}}
          className="bg-success hover:bg-surface-400 text-gray-500 rounded-full w-9 h-9 flex items-center justify-center select-none mr-3"
        >
          <Image src="/save.svg" alt="Save edit" width={20} height={20} />
        </button>
        <button
          id="edit-button"
          onClick={() => onCancelClick()}
          className="bg-cancel hover:bg-surface-400 text-gray-500 rounded-full w-9 h-9 flex items-center justify-center select-none"
        >
          <Image src="/cancel.svg" alt="Cancel edit" width={20} height={20} />
        </button>
      </div>
      <SubjectsMenu />
    </div>
  );
};

export default SubjectsActions;
