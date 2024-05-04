import React, { useState } from "react";
import Image from "next/image";
import { joinClassNames, getStatusStyle } from "@/app/utils/helpers";
import { useAppDispatch } from "@/lib/hooks";
import { useSelector } from "react-redux";
import {
  updateGradeSelectedCourse,
  updateStatusSelectedCourse,
  updateTermSelectedCourse,
  updateYearSelectedCourse,
  selectSelectedCourse,
} from "@/lib/features/coursesSlice";
import { grades, statuses, terms, years } from "@/app/utils/constants";

const CompleteCourse = () => {
  const dispatch = useAppDispatch();
  const selectedCourse = useSelector(selectSelectedCourse);
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <div>
      {" "}
      COMPLETE COURSE
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-gray-700 dark:text-slate-400">
            Cursada
          </label>
          <select
            disabled={
              selectedCourse!.term === null && selectedCourse!.year === null
            }
            style={{ cursor: isEditing ? "pointer" : "" }}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-600 dark:border-none border rounded-md shadow-sm border-slate-300 focus:outline-none"
          >
            <option>
              {selectedCourse!.term}
              {" - "}
              {selectedCourse!.year}
            </option>
          </select>
        </div>
        <div className="ml-4">
          <label className="block text-gray-700 dark:text-slate-400 ml-1">
            Acciones
          </label>
          <div className="w-full select-none grid grid-cols-3 gap-4">
            <button
              disabled={isEditing}
              onClick={() => setIsEditing(true)}
              className="px-2 py-2 w-full mt-[5px] rounded-md shadow-sm flex items-center ripple-yellow"
            >
              <Image
                src="/edit_black.svg"
                alt="Start edit"
                width={20}
                height={20}
                className="mr-1"
              />
              <p className="text-black">Editar</p>
            </button>
            <button
              disabled
              className=" w-full mt-[5px] rounded-md shadow-sm flex items-center bg-success duration-500"
              style={{
                minWidth: isEditing ? "106px" : "0",
                width: isEditing ? "106px" : "0",
              }}
            >
              <Image
                src="/save.svg"
                alt="Save edit"
                width={17}
                height={17}
                className="mx-2 duration-500"
                style={{
                  minWidth: isEditing ? "17px" : "0",
                  width: isEditing ? "17px" : "0",
                }}
              />
              <div
                style={{
                  width: isEditing ? "auto" : "0",
                  minWidth: isEditing ? "auto" : "0",
                  overflow: "hidden",
                }}
                className="text-slate-200 duration-500"
              >
                Guardar
              </div>
            </button>
            <button
              className=" w-full mt-[5px] rounded-md shadow-sm flex items-center bg-cancel duration-500"
              style={{
                minWidth: isEditing ? "106px" : "0",
                width: isEditing ? "106px" : "0",
              }}
              onClick={() => setIsEditing(false)}
            >
              <Image
                src="/cancel.svg"
                alt="Cancel edit"
                width={25}
                height={25}
                className="invert duration-500 ml-1"
                style={{
                  minWidth: isEditing ? "25px" : "0",
                  width: isEditing ? "25px" : "0",
                }}
              />
              <div
                style={{
                  width: isEditing ? "auto" : "0",
                  minWidth: isEditing ? "auto" : "0",
                  overflow: "hidden",
                }}
                className="text-slate-200 duration-500"
              >
                Cancelar
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full border mt-8 border-slate-300 dark:border-slate-500" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="md:col-span-2">
          <label className="block text-gray-700 dark:text-slate-400">
            Examenes
          </label>
          <div className="w-full mt-1 rounded-sm shadow-sm border border-slate-300 dark:border-slate-500 h-[128px]">
            <table className="w-full shadow-sm border-slate-300 text-sm dark:border-slate-500 ">
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
            {isEditing ? (
              <select
                disabled={selectedCourse!.status === "Cursando"}
                onChange={(e) => handleGradeChange(e.target.value)}
                value={selectedCourse!.finalGrade ?? ""}
                className={`${
                  selectedCourse!.status === "Cursando"
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
            ) : (
              <div className="mt-1 block w-full pr-3 pl-4 py-2 bg-white border rounded-md shadow-sm dark:bg-slate-600 dark:border-none border-slate-300 focus:outline-none">
                {selectedCourse!.finalGrade === null
                  ? "-"
                  : selectedCourse!.finalGrade}
              </div>
            )}
          </div>
          <div>
            <label className="mt-4 block text-gray-700 dark:text-slate-400">
              Estado
            </label>
            {isEditing ? (
              <select
                onChange={(e) => handleStatusChange(e.target.value)}
                value={
                  selectedCourse!.status === null
                    ? "---"
                    : selectedCourse!.status
                }
                className={joinClassNames(
                  getStatusStyle(selectedCourse!.status!),
                  "hover:cursor-pointer text-white mt-1 block w-full px-3 py-2 border shadow-sm dark:border-none dark:rounded-md border-slate-300 placeholder-slate-400 focus:outline-none"
                )}
              >
                {statuses.map((status, index) => (
                  <option
                    key={index}
                    value={status.status === null ? "---" : status.description}
                    disabled={status.status === null}
                    className="bg-white text-black hover:cursor-pointer"
                  >
                    {status.description}
                  </option>
                ))}
              </select>
            ) : (
              <div
                className={joinClassNames(
                  getStatusStyle(selectedCourse!.status!),
                  "text-white mt-1 block w-full pr-3 pl-4 py-2 border shadow-sm dark:border-none dark:rounded-md border-slate-300 placeholder-slate-400 focus:outline-none"
                )}
              >
                {selectedCourse!.status}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteCourse;
