"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import {
  selectIsEditing,
  selectSelectedSubject,
  addSubjectToUpdate,
  setSelectedSubject,
  updateGradeSelectedSubject,
  updateStatusSelectedSubject,
} from "@/lib/features/subjectsSlice";
import { selectAllCorrelatives } from "@/lib/features/correlativesSlice";
import {
  correlativeCheck,
  getNewAvailableSubjects,
  joinClassNames,
  getStatusStyleWithRipple,
} from "@/app/utils/helpers";
import Image from "next/image";
import Menu from "../../Menu";
import SelectedRow from "./SelectedRow";

interface FastEditRowsProps {
  subjects: Subject[];
}

const FastEditRows = ({ subjects }: FastEditRowsProps) => {
  const dispatch = useAppDispatch();
  const isEditing = useSelector(selectIsEditing);
  const selectedSubject = useSelector(selectSelectedSubject);
  const correlatives = useSelector(selectAllCorrelatives);
  const [subjectStatusMenu, setSubjectStatusMenu] = useState<
    Subject | undefined
  >(undefined);
  const [subjectGradeMenu, setSubjectGradeMenu] = useState<Subject | undefined>(
    undefined
  );

  const handleShowGrade = (subject: Subject) => {
    //dispatch(setSelectedSubject(subject));
    if (!isEditing) return;
    if (selectedSubject !== undefined) return;
    if (subjectGradeMenu && subject.code === subjectGradeMenu.code)
      return setSubjectGradeMenu(undefined);

    setSubjectGradeMenu(subject);
  };

  const handleShowStatus = (subject: Subject) => {
    //dispatch(setSelectedSubject(subject));
    if (subjectStatusMenu && subject.code === subjectStatusMenu.code)
      return setSubjectStatusMenu(undefined);

    setSubjectStatusMenu(subject);
  };

  const handleUpdateStatus = (value: string) => {
    if (selectedSubject === undefined)
      dispatch(setSelectedSubject(subjectStatusMenu));

    dispatch(updateStatusSelectedSubject(value));
    setSubjectStatusMenu(undefined);
  };

  const handleUpdateGrade = (value: string) => {
    if (selectedSubject === undefined)
      dispatch(setSelectedSubject(subjectGradeMenu));

    dispatch(updateGradeSelectedSubject(value));
    setSubjectGradeMenu(undefined);
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
            handleEdit={() => {}}
            handleConfirmEdit={handleConfirmEdit}
          />
        ) : (
          <tr
            key={subject.code}
            className={`${
              isEditing && subject.status === "No disponible"
                ? "opacity-35 duration-350"
                : ""
            } ${selectedSubject ? "opacity-35 duration-350" : "duration-350"} `}
          >
            <td className="border-b dark:border-gray-700 p-4">
              {subject.code}
            </td>
            <td
              className={`border-b dark:border-gray-700 p-4 ${
                subject.description.length > 25 ? "text-sm" : ""
              }`}
            >
              {subject.description}
            </td>
            <td className="border-b dark:border-gray-700 p-4">
              {subject.weeklyHours}hs
            </td>
            <td className="border-b dark:border-gray-700 p-4 pr-10">
              <div
                className={`flex relative ${
                  subject.status === "No disponible" && isEditing
                    ? "hidden"
                    : ""
                } ${
                  subject.status !== "No disponible" &&
                  isEditing &&
                  !selectedSubject
                    ? "cursor-pointer"
                    : ""
                }
                `}
                onClick={() => handleShowGrade(subject)}
              >
                <div className="w-full text-center">
                  {subject.finalGrade ? subject.finalGrade : "-"}
                </div>
                {subject.status !== "No disponible" && (
                  <Image
                    src="/chevron-down-white.svg"
                    alt="Dropdown status"
                    width={23}
                    height={23}
                    style={{
                      width: isEditing ? "23px" : "0px",
                      height: "23px",
                    }}
                    className="duration-350"
                  />
                )}
                {subjectGradeMenu && subjectGradeMenu.code === subject.code && (
                  <Menu
                    values={["-", "4", "5", "6", "7", "8", "9", "10"].filter(
                      (x) => x !== subject.finalGrade?.toString()
                    )}
                    minWidth="min-w-10"
                    maxWidth="max-h-14"
                    onClose={() => setSubjectGradeMenu(undefined)}
                    onClick={handleUpdateGrade}
                  />
                )}
              </div>
            </td>
            <td className={"border-b dark:border-gray-700 p-4"}>
              <div className="flex relative">
                <button
                  disabled={
                    subject.status === "No disponible" ||
                    !isEditing ||
                    selectedSubject !== undefined
                  }
                  onClick={() => handleShowStatus(subject)}
                  className={joinClassNames(
                    getStatusStyleWithRipple(subject.status),
                    "rounded-md py-1 px-2 w-36 shadow-lg text-gray-200 flex duration-350 select-none"
                  )}
                >
                  <p className="w-full duration-350">{subject.status}</p>
                  {subject.status !== "No disponible" && (
                    <Image
                      src="/chevron-down-white.svg"
                      alt="Dropdown status"
                      width={0}
                      height={0}
                      style={{
                        width: isEditing ? "23px" : "0px",
                        height: "23px",
                        opacity: isEditing ? 1 : 0,
                        transition: "width 350ms ease, opacity 350ms ease",
                      }}
                      className="duration-350"
                    />
                  )}
                </button>
                {subjectStatusMenu &&
                  subjectStatusMenu.code === subject.code && (
                    <Menu
                      onClose={() => setSubjectStatusMenu(undefined)}
                      values={["Disponible", "Cursando", "Aprobada"].filter(
                        (x) => x !== subject.status
                      )}
                      maxWidth="max-width-40"
                      minWidth="min-w-36"
                      onClick={handleUpdateStatus}
                    />
                  )}
              </div>
            </td>
            <td className="border-b dark:border-gray-700">
              <div className="flex justify-around">
                {subject.status !== "No disponible" && (
                  <>
                    <div
                      className="flex justify-center h-8 items-center bg-success rounded-full opacity-35 duration-350"
                      style={{
                        width: isEditing ? "32px" : "0",
                        maxWidth: isEditing ? "32px" : "0",
                      }}
                    >
                      <Image
                        src="/check.svg"
                        alt="Confirm edit"
                        width={21}
                        height={21}
                        className="invert"
                      />
                    </div>
                    <div
                      className="flex justify-center h-8 items-center bg-cancel rounded-full opacity-35 duration-350"
                      style={{
                        width: isEditing ? "32px" : "0",
                        maxWidth: isEditing ? "32px" : "0",
                      }}
                    >
                      <Image
                        src="/cancel.svg"
                        alt="Cancel edit"
                        width={26}
                        height={26}
                        className="invert"
                      />
                    </div>
                  </>
                )}
              </div>
            </td>
          </tr>
        )
      )}
    </>
  );
};

export default FastEditRows;
