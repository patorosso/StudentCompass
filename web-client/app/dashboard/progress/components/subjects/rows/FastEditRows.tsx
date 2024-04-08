"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import {
  selectIsEditing,
  selectSelectedSubject,
  addSubjectToUpdate,
  setSelectedSubject,
} from "@/lib/features/subjectsSlice";
import { selectAllCorrelatives } from "@/lib/features/correlativesSlice";
import { correlativeCheck, getNewAvailableSubjects } from "@/app/utils/helpers";
import SelectedRow from "./SelectedRow";
import RegularRow from "./RegularRow";

interface FastEditRowsProps {
  subjects: Subject[];
}

const FastEditRows = ({ subjects }: FastEditRowsProps) => {
  const dispatch = useAppDispatch();
  const isEditing = useSelector(selectIsEditing);
  const selectedSubject = useSelector(selectSelectedSubject);
  const correlatives = useSelector(selectAllCorrelatives);

  const handleEdit = (clickedSubject: Subject | undefined) => {
    if (!isEditing) return;
    if (clickedSubject?.status === "No disponible") return;
    if (clickedSubject?.code === selectedSubject?.code) return;

    if (clickedSubject !== selectedSubject)
      dispatch(setSelectedSubject(clickedSubject));
  };

  const handleConfirmEdit = () => {
    if (correlatives === null) return;

    var previousSubject = subjects.find(
      (x) => x.code === selectedSubject?.code
    );
    if (previousSubject === undefined) return;
    // Si la materia estaba aprobada, verificar consistencia
    var subjectsToCheck: string[] = [];
    if (
      previousSubject.status === "Aprobada" &&
      selectedSubject?.status !== "Aprobada"
    ) {
      subjectsToCheck = correlativeCheck(
        correlatives,
        subjects,
        previousSubject.code
      );
      if (subjectsToCheck.length > 0) {
        // Open modal to show subjects with problems
      }
    }
    // poner esto en el helper, que devuelva las subjects y punto:
    var subjectsToMakeUnavailable = subjectsToCheck.map((code) =>
      subjects.find((subject) => subject.code === parseInt(code))
    );

    // Si la materia se pasa a aprobada, buscar nuevas disponibles a actualizar
    var subjectsToMakeAvailable: Subject[] = [];
    if (
      selectedSubject?.status === "Aprobada" &&
      previousSubject.status !== "Aprobada"
    ) {
      subjectsToMakeAvailable = getNewAvailableSubjects(
        selectedSubject.code,
        correlatives,
        subjects
      );
    }

    dispatch(
      addSubjectToUpdate({
        previousSubject,
        subjectsToMakeAvailable,
        subjectsToMakeUnavailable,
      })
    );
  };

  return (
    <>
      {subjects.map((subject) =>
        selectedSubject?.code === subject.code ? (
          <SelectedRow
            key={subject.code}
            selectedSubject={selectedSubject}
            handleEdit={handleEdit}
            handleConfirmEdit={handleConfirmEdit}
          />
        ) : (
          <RegularRow
            subject={subject}
            key={subject.code}
            handleEdit={handleEdit}
          />
        )
      )}
    </>
  );
};

export default FastEditRows;
