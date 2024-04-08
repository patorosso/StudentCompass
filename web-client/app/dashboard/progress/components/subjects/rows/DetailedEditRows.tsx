"use client";
import React from "react";
import RegularRow from "./RegularRow";
import { useAppDispatch } from "@/lib/hooks";
import { useSelector } from "react-redux";
import {
  selectIsEditing,
  setDetailedModal,
  setSelectedSubject,
} from "@/lib/features/subjectsSlice";

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
        <RegularRow
          subject={subject}
          key={subject.code}
          handleEdit={handleEdit}
        />
      ))}
    </>
  );
};

export default DetailedEditRows;
