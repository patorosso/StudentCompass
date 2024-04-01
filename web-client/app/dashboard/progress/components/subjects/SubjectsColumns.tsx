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
    <thead className="text-left text-white sticky top-0 bg-gray-600">
      <tr>
        <th className="p-4">Código</th>
        <th className="p-4 w-80">Descripción</th>
        <th className="p-4">Horas</th>
        <th className="p-5">Nota</th>
        <th className="px-5 py-4">Estado</th>
        <th
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
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
