import React, { useState } from "react";
import Image from "next/image";
import { joinClassNames, getStatusStyle } from "@/app/utils/helpers";
import { useAppDispatch } from "@/lib/hooks";
import { grades, statuses, terms, years } from "@/app/utils/constants";
import { addNewCourse } from "@/lib/features/coursesSlice";

const NewCourse = () => {
  const dispatch = useAppDispatch();
  const [isCourseValid, setIsCourseValid] = useState(false);
  const [year, setYear] = useState<string | null>(null);
  const [term, setTerm] = useState<string | null>(null);
  const [finalGrade, setFinalGrade] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const onAddNewCourse = () => {
    // todo: validate
    const newCourse: Course = {
      id: null,
      exams: [],
      year: year!,
      term: term!,
      subjectCode: 1,
      careerPlanId: 1,
      status: status!,
      finalGrade: Number(finalGrade!),
    };
    //dispatch(addNewCourse(newCourse));
  };

  return (
    <div>
      {" "}
      NO COURSE AT ALL
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-gray-700 dark:text-slate-400">
            Cursada
          </label>
          <div className="flex">
            <select
              value={term ?? "Seleccionar cuatrimestre"}
              onChange={(e) => setTerm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-600 dark:border-none border rounded-md shadow-sm hover:cursor-pointer border-slate-300 focus:outline-none"
            >
              {terms.map((term, index) => (
                <option
                  disabled={term === "Seleccionar cuatrimestre"}
                  key={index}
                >
                  {term}
                </option>
              ))}
            </select>
            <select
              value={year ?? "Año"}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 ml-2 block  px-3 py-2 bg-white dark:bg-slate-600 dark:border-none border rounded-md shadow-sm hover:cursor-pointer border-slate-300 focus:outline-none"
            >
              {years.map((year, index) => (
                <option disabled={year === "Año"} key={index}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="ml-4">
          <label className="block text-gray-700 dark:text-slate-400 ml-1">
            Acciones
          </label>
          <div className="w-full select-none grid grid-cols-3 gap-4">
            <button
              disabled={isCourseValid}
              onClick={() => onAddNewCourse()}
              className="px-2 py-2 w-full mt-[5px] rounded-md shadow-sm flex items-center bg-success duration-500"
            >
              <Image
                src="/save.svg"
                alt="Save edit"
                width={17}
                height={17}
                className="mx-2 duration-500"
              />
              <div className="text-slate-200 duration-500">Guardar</div>
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
            <select
              onChange={(e) => setFinalGrade(e.target.value)}
              value={finalGrade ?? ""}
              className={`${
                status === "Cursando"
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
              onChange={(e) => setStatus(e.target.value)}
              value={status ?? "Seleccionar estado"}
              className={joinClassNames(
                getStatusStyle(status ?? "Seleccionar estado"),
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCourse;
