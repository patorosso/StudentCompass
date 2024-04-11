"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectSelectedSubject } from "@/lib/features/subjectsSlice";
import {
  updateGradeSelectedCourse,
  updateStatusSelectedCourse,
  selectCourses,
  fetchCourses,
  selectSelectedCourse,
  setSelectedCourse,
  updateTermSelectedCourse,
  updateYearSelectedCourse,
} from "@/lib/features/coursesSlice";
import { getStatusStyle, joinClassNames } from "@/app/utils/helpers";
import { useAppDispatch } from "@/lib/hooks";

const Courses = () => {
  const dispatch = useAppDispatch();
  const selectedCourse = useSelector(selectSelectedCourse);
  const selectedSubject = useSelector(selectSelectedSubject);
  const [isEditing, setIsEditing] = useState(false);

  const courses = getSubjectCourses(
    useSelector(selectCourses),
    selectedSubject!.code
  );

  useEffect(() => {
    if (courses === null)
      dispatch(fetchCourses({ subjectCode: selectedSubject!.code }));
    else dispatch(setSelectedCourse(courses[0]));
  }, []);

  const handleStatusChange = (status: string) => {
    dispatch(updateStatusSelectedCourse(status));
  };

  const handleGradeChange = (grade: string) => {
    dispatch(updateGradeSelectedCourse(grade));
  };

  const handleTermChange = (term: string) => {
    dispatch(updateTermSelectedCourse(term));
  };

  const handleYearChange = (year: string) => {
    dispatch(updateYearSelectedCourse(year));
  };

  const handleAddSelectedCourse = () => {
    const newCourse: Course = createEmptyCourse(
      selectedSubject!.code,
      selectedSubject!.careerPlanId
    );
    dispatch(setSelectedCourse(newCourse));
  };

  return (
    <div className="w-full">
      <div className="text-3xl text-slate-600 dark:text-white">
        {selectedSubject!.code + " - " + selectedSubject!.description}
      </div>
      <div className="w-full border mt-6 border-slate-300 dark:border-slate-500" />
      {selectedCourse ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-gray-700 dark:text-slate-400">
                Cursada
              </label>
              {!isEditing ? (
                <select className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-600 dark:border-none border rounded-md shadow-sm hover:cursor-pointer border-slate-300 focus:outline-none">
                  <option>
                    {selectedCourse.term}
                    {" - "}
                    {selectedCourse.year}
                  </option>
                </select>
              ) : (
                <div className="flex">
                  <select
                    onChange={(e) => handleTermChange(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-600 dark:border-none border rounded-md shadow-sm hover:cursor-pointer border-slate-300 focus:outline-none"
                  >
                    {terms.map((term, index) => (
                      <option key={index}>{term}</option>
                    ))}
                  </select>
                  <select
                    onChange={(e) => handleYearChange(e.target.value)}
                    className="mt-1 ml-2 block  px-3 py-2 bg-white dark:bg-slate-600 dark:border-none border rounded-md shadow-sm hover:cursor-pointer border-slate-300 focus:outline-none"
                  >
                    {years.map((year, index) => (
                      <option key={index}>{year}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="ml-4">
              <label className="block text-gray-700 dark:text-slate-400 ml-1">
                Acciones
              </label>
              <div className="w-full select-none grid grid-cols-3 gap-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-2 w-full mt-[5px] rounded-md shadow-sm flex items-center bg-yellow-500"
                >
                  <Image
                    src="/edit.svg"
                    alt="Start edit"
                    width={20}
                    height={20}
                    className="invert mr-1"
                  />
                  <p className="text-slate-100">Editar</p>
                </button>
                {isEditing && (
                  <>
                    <button
                      disabled
                      className="px-3 py-2 w-full mt-[5px] rounded-md shadow-sm flex items-center bg-success"
                    >
                      <Image
                        src="/save.svg"
                        alt="Save edit"
                        width={17}
                        height={17}
                        className="mr-1"
                      />
                      <p className="text-slate-200">Guardar</p>
                    </button>
                    <button
                      disabled
                      className="px-3 py-2 w-full mt-[5px] rounded-md shadow-sm flex items-center bg-cancel"
                    >
                      <Image
                        src="/cancel.svg"
                        alt="Cancel edit"
                        width={20}
                        height={20}
                        className=""
                      />
                      <p className="text-slate-200">Cancelar</p>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full border mt-8 border-slate-300 dark:border-slate-500" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-slate-400">
                Examenes
              </label>
              <div className="w-full mt-1 rounded-sm shadow-sm border border-slate-300 dark:border-slate-500">
                <table className="w-full shadow-sm border-slate-300 text-sm dark:border-slate-500">
                  <thead className="border-b border-slate-300 dark:border-slate-500">
                    <tr className="text-left text-slate-700 dark:text-slate-100">
                      <th className="p-2 rounded-tl-lg w-24">Fecha</th>
                      <th className="p-2 w-48">Tipo</th>
                      <th className="p-2">Nota</th>
                      <th className="p-2 rounded-tr-lg">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="rounded-b-lg">
                    <tr className="dark:text-slate-300">
                      <td className="p-2">01/01/2023</td>
                      <td className="p-2">Final</td>
                      <td className="p-2">10</td>
                      <td className="p-2">Aprobada</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:col-span-1">
              <div>
                <label className=" block text-gray-700 dark:text-slate-400">
                  Nota final
                </label>
                <select
                  disabled={selectedCourse?.status === "Cursando"}
                  onChange={(e) => handleGradeChange(e.target.value)}
                  value={selectedCourse?.finalGrade ?? ""}
                  className={`${
                    selectedCourse?.status === "Cursando"
                      ? "text-slate-400"
                      : "hover:cursor-pointer"
                  } mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm dark:bg-slate-600 dark:border-none border-slate-300 focus:outline-none`}
                >
                  {grades.map((grade, index) => (
                    <option
                      key={index}
                      value={grade.grade === null ? "" : grade.grade}
                      disabled={grade.grade === null}
                      className="bg-white text-black hover:cursor-pointer"
                    >
                      {grade.description}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mt-4 block text-gray-700 dark:text-slate-400">
                  Estado
                </label>
                <select
                  onChange={(e) => handleStatusChange(e.target.value)}
                  value={selectedCourse?.status ?? ""}
                  className={joinClassNames(
                    getStatusStyle(selectedCourse?.status!),
                    "hover:cursor-pointer text-white mt-1 block w-full px-3 py-2 border shadow-sm dark:border-none dark:rounded-md border-slate-300 placeholder-slate-400 focus:outline-none"
                  )}
                >
                  {statuses.map((status, index) => (
                    <option
                      key={index}
                      value={status || ""}
                      disabled={status === ""}
                      className="bg-white text-black hover:cursor-pointer"
                    >
                      {status || "Seleccionar estado"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center mt-20">
            <button
              onClick={() => handleAddSelectedCourse()}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-500 rounded-full w-28 h-28 flex items-center justify-center select-none shadow-md"
            >
              <Image
                src="/add.svg"
                alt="Toggle Sidebar"
                width={60}
                height={60}
                className=""
              />
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <p>Aún no hay cursadas para esta materia.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;

const terms = [
  "Primer cuatrimestre",
  "Segundo cuatrimestre",
  "Tercer cuatrimestre",
  "Seleccionar cuatrimestre",
];
const statuses = ["Cursando", "Cursada", "Aprobada", "Desaprobada", ""];
const years = [
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "Año",
];

const grades = [
  { description: "10 (Diez)", grade: 10 },
  { description: "9 (Nueve)", grade: 9 },
  { description: "8 (Ocho)", grade: 8 },
  { description: "7 (Siete)", grade: 7 },
  { description: "6 (Seis)", grade: 6 },
  { description: "5 (Cinco)", grade: 5 },
  { description: "4 (Cuatro)", grade: 4 },
  { description: "3 (Tres)", grade: 3 },
  { description: "2 (Dos)", grade: 2 },
  { description: "1 (Uno)", grade: 1 },
  { description: "Ausente", grade: undefined },
  { description: "Seleccionar nota", grade: null },
];

const getSubjectCourses = (
  coursesDict: CoursesDict,
  subjectCode: number
): Course[] | null =>
  coursesDict.hasOwnProperty(subjectCode) ? coursesDict[subjectCode] : null;

const createEmptyCourse = (
  subjectCode: number,
  careerPlanId: number
): Course => {
  return {
    id: 0,
    subjectCode: subjectCode,
    careerPlanId: careerPlanId,
    year: null,
    term: null,
    exams: [],
    finalGrade: null,
    status: null,
  };
};
