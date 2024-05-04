"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectIsEditing } from "@/lib/features/subjectsSlice";
import { selectEditStyle } from "@/lib/features/userSlice";

const SubjectsColumns = () => {
  const isEditing = useSelector(selectIsEditing);
  const editStyle = useSelector(selectEditStyle);
  const shouldShowConfirmEdit = isEditing && editStyle === "Fast";

  return (
    <thead className="z-40 text-left text-gray-100 sticky top-0 bg-primary dark:bg-slate-700">
      <tr>
        <th className="p-4">Código</th>
        <th className="p-4 w-80">Descripción</th>
        <th className="p-4">Horas</th>
        <th className="p-5">Nota</th>
        <th className="px-5 py-4">Estado</th>
        <th
          className={`duration-350 overflow-hidden ${
            shouldShowConfirmEdit ? "text-white" : "text-gray-600"
          }`}
          style={{
            maxWidth: shouldShowConfirmEdit ? "100px" : "0",
            width: shouldShowConfirmEdit ? "100px" : "0",
          }}
        >
          Confirmar
        </th>
      </tr>
    </thead>
  );
};

export default SubjectsColumns;
