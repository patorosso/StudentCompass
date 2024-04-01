"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import { useSearchParams } from "next/navigation";
import {
  selectAllSubjects,
  fetchSubjects,
  selectIsEditing,
  selectSelectedSubject,
  setSelectedSubject,
} from "@/lib/features/subjectsSlice";
import { selectEditStyle } from "@/lib/features/userSlice";
import { joinClassNames, getStatusStyle } from "../../../../utils/helpers";
import Modal from "../Modal";
import Image from "next/image";
import Menu from "../Menu";

const SubjectsRows = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const editStyle = useSelector(selectEditStyle);
  const isEditing = useSelector(selectIsEditing);
  const subjects = useSelector(selectAllSubjects);
  const selectedSubject = useSelector(selectSelectedSubject);
  const [openModal, setOpenModal] = useState(false);
  const [showGradeMenu, setShowGradeMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  useEffect(() => {
    if (subjects.length === 0) {
      let student = searchParams.get("studentId");
      let career = searchParams.get("careerPlanId");
      dispatch(fetchSubjects({ student, career }));
    }
  }, [subjects]);

  const handleEdit = (clickedSubject: Subject | undefined) => {
    if (!isEditing) return;
    if (clickedSubject?.status === "No disponible") return;

    if (editStyle === "Detailed") {
      setOpenModal(true);
      return;
    }

    if (clickedSubject !== selectedSubject)
      dispatch(setSelectedSubject(clickedSubject));
  };

  // const handleUpdateNote = (value: string) => {
  //   // parse string to number
  //   selectedSubject.finalGrade = value === "-" ? null : parseInt(value);

  const actionColumnStyle = {
    transition: "width 0.5s ease-in-out",
    overflow: "hidden",
  };

  return (
    <>
      <tbody>
        {subjects.map((subject) =>
          editStyle === "Fast" && selectedSubject?.code === subject.code ? (
            <tr
              key={subject.code}
              className={`${isEditing ? " text-second" : "hover:text-second"}`}
              onClick={() => handleEdit(subject)}
            >
              <td className="border-b dark:border-gray-700 p-4 bg-slate-900">
                {subject.code}
              </td>
              <td
                className={`border-b dark:border-gray-700 p-4 bg-slate-900 ${
                  subject.description.length > 25 ? "text-sm" : ""
                }`}
              >
                {subject.description}
              </td>
              <td className="border-b dark:border-gray-700 p-4 bg-slate-900">
                {subject.weeklyHours}hs
              </td>

              <td className="border-b dark:border-gray-700 p-4 max-width-6 bg-slate-900">
                <div className="flex">
                  <div className="w-full">
                    {subject.finalGrade ? subject.finalGrade : "-"}
                  </div>
                  <Image
                    src="/chevron-down-white.svg"
                    alt="Dropdown status"
                    style={{
                      width: isEditing ? "20px" : "0",
                    }}
                    width={5}
                    height={5}
                    className="cursor-pointer duration-350 ease-in-out"
                    onClick={() => setShowGradeMenu(!showGradeMenu)}
                  />
                  {showGradeMenu && (
                    <Menu
                      values={["-", "4", "5", "6", "7", "8", "9", "10"]}
                      title="Nota"
                      maxWidth="max-width-20"
                      onClick={() => {}}
                    />
                  )}
                </div>
              </td>
              <td className={"border-b dark:border-gray-700 p-4 bg-slate-900"}>
                <>
                  <div className="flex relative">
                    <div
                      className={joinClassNames(
                        getStatusStyle(subject.status),
                        "rounded-md py-1 text-center shadow-lg text-gray-200 w-full"
                      )}
                    >
                      {subject.status}
                    </div>
                    <Image
                      src="/chevron-down-white.svg"
                      alt="Dropdown status"
                      style={{
                        width: isEditing ? "20px" : "0",
                      }}
                      width={5}
                      height={5}
                      className="ml-2 cursor-pointer duration-350 ease-in-out"
                      onClick={() => setShowStatusMenu(!showStatusMenu)}
                    />
                    {showStatusMenu && (
                      <Menu
                        values={["Disponible", "Cursando", "Aprobada"]}
                        title="Estado"
                        maxWidth="max-width-40"
                        onClick={() => {}}
                      />
                    )}
                  </div>
                </>
              </td>
              {isEditing && (
                <td
                  style={actionColumnStyle}
                  className="border-b dark:border-gray-700 bg-slate-900"
                >
                  <div className="flex justify-center items-center">
                    <button onClick={() => {}}>
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
          ) : (
            <tr
              key={subject.code}
              className={`${
                isEditing &&
                !selectedSubject &&
                subject.status === "No disponible"
                  ? "text-gray-400"
                  : ""
              }${
                isEditing &&
                !selectedSubject &&
                subject.status !== "No disponible"
                  ? "hover:text-second cursor-pointer"
                  : ""
              } 
              ${
                isEditing &&
                selectedSubject &&
                subject.status !== "No disponible"
                  ? "cursor-pointer hover:bg-slate-800"
                  : ""
              } ${
                isEditing &&
                selectedSubject &&
                subject.status === "No disponible"
                  ? "text-gray-400"
                  : ""
              }`}
              onClick={() => handleEdit(subject)}
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
              <td className="border-b dark:border-gray-700 p-4">
                <div className="flex">
                  <div className="w-full">
                    {subject.finalGrade ? subject.finalGrade : "-"}
                  </div>
                  <Image
                    src="/chevron-down-white.svg"
                    alt="Dropdown status"
                    width={0}
                    height={0}
                    className="cursor-pointer duration-350 ease-in-out"
                  />
                </div>
              </td>
              <td className={"border-b dark:border-gray-700 p-4 w-44"}>
                <>
                  <div className="flex">
                    <div
                      className={joinClassNames(
                        getStatusStyle(subject.status),
                        "rounded-md py-1 text-center shadow-lg text-gray-200 w-full"
                      )}
                    >
                      {subject.status}
                    </div>
                    <Image
                      src="/chevron-down-white.svg"
                      alt="Dropdown status"
                      width={0}
                      height={0}
                      className="ml-2 cursor-pointer duration-350 ease-in-out"
                    />
                  </div>
                </>
              </td>
              {isEditing && editStyle === "Fast" && (
                <td
                  style={actionColumnStyle}
                  className="border-b dark:border-gray-700"
                >
                  <div className="flex justify-center items-center">
                    <button onClick={() => {}}>
                      <Image
                        src="/check-disabled.svg"
                        alt="Confirm"
                        width={25}
                        height={25}
                      />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          )
        )}
      </tbody>
      {isEditing && editStyle === "Detailed" && (
        <>
          <Modal
            title="Materia"
            subtitle="Detalle de la materia"
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            onAccept={() => console.log("Aceptar")}
          >
            <div>body2</div>
          </Modal>
        </>
      )}
    </>
  );
};

export default SubjectsRows;
