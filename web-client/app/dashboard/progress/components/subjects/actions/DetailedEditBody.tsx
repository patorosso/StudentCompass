"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  selectSelectedSubject,
  updateStatusSelectedSubject,
} from "@/lib/features/subjectsSlice";
import { getStatusStyle, joinClassNames } from "@/app/utils/helpers";
import { useAppDispatch } from "@/lib/hooks";

const DetailedEditBody = () => {
  const dispatch = useAppDispatch();
  const selectedSubject = useSelector(selectSelectedSubject);

  const handleStatusChange = (status: string) => {
    console.log(status);
    dispatch(updateStatusSelectedSubject(status));
  };

  return (
    <div className="w-full">
      <div className="text-3xl text-slate-600 dark:text-white">
        {selectedSubject!.code + " - " + selectedSubject!.description}
      </div>
      <div className="w-full border mt-6 border-slate-300 dark:border-slate-500" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-gray-700 dark:text-slate-400">
            Cursada
          </label>
          <select className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-600 dark:border-none border rounded-md shadow-sm hover:cursor-pointer border-slate-300 focus:outline-none">
            <option>Primer cuatrimestre - 2023</option>
          </select>
        </div>
        <div>
          <div className="mt-1 block w-full px-3 py-2 select-none"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="md:col-span-2">
          <label className="block text-gray-700 dark:text-slate-400">
            Examenes
          </label>
          <div className="h-full w-full mt-1 rounded-sm shadow-sm border border-slate-300 dark:border-slate-500">
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
            <select className="mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm dark:bg-slate-600 dark:border-none border-slate-300 focus:outline-none">
              <option>10 (Diez)</option>
              <option>9 (Nueve)</option>
              <option>8 (Ocho)</option>
              <option>7 (Siete)</option>
              <option>6 (Seis)</option>
              <option>5 (Cinco)</option>
              <option>4 (Cuatro)</option>
              <option>3 (Tres)</option>
              <option>2 (Dos)</option>
              <option>1 (Uno)</option>
              <option>Ausente</option>
            </select>
          </div>
          <div>
            <label className="mt-4 block text-gray-700 dark:text-slate-400">
              Estado
            </label>
            <select
              onChange={(e) => handleStatusChange(e.target.value)}
              defaultValue={selectedSubject!.status}
              className={joinClassNames(
                getStatusStyle(selectedSubject!.status),
                "hover:cursor-pointer text-white mt-1 block w-full px-3 py-2 border shadow-sm dark:border-none dark:rounded-md border-slate-300 placeholder-slate-400 focus:outline-none"
              )}
            >
              {["Cursando", "Cursada", "Aprobada", "Desaprobada"].map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                    className="bg-white text-black hover:cursor-pointer"
                  >
                    {status}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedEditBody;
