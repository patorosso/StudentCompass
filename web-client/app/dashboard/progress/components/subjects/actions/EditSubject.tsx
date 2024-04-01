"use client";
import React from "react";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { getCorrelatives } from "@/lib/features/correlativesSlice";
import { setIsEditing, selectIsEditing } from "@/lib/features/subjectsSlice";
import { useSelector } from "react-redux";
import { selectAllCorrelatives } from "@/lib/features/correlativesSlice";

const EditSubject = () => {
  const dispatch = useAppDispatch();
  const isEditing = useSelector(selectIsEditing);
  const correlatives = useSelector(selectAllCorrelatives);

  const onEditClick = () => {
    let career = "1";
    if (correlatives === null) dispatch(getCorrelatives({ career }));

    dispatch(setIsEditing(true));
  };

  const buttonStyle = {
    transition: "transform 0.6s ease-out", // Adjust time as needed for a smoother effect
  };

  const imageStyle = {
    transform: isEditing
      ? "rotate(-360deg)" // Adjust -100px to the distance you want it to move to the left
      : "rotate(0deg)",
    transition: "transform 0.6s ease-out",
  };

  return (
    <div className="">
      <button
        id="edit-button"
        onClick={() => onEditClick()}
        className="bg-surface-300 hover:bg-surface-400 text-gray-500 rounded-full w-9 h-9 flex items-center justify-center select-none mr-3"
        disabled={isEditing}
        style={buttonStyle}
      >
        <Image
          src="/edit.svg"
          alt="Toggle Sidebar"
          width={25}
          height={25}
          style={imageStyle}
        />
      </button>
    </div>
  );
};

export default EditSubject;
