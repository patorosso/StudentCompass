"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectSelectedSubject } from "@/lib/features/subjectsSlice";

const DetailedEditBody = () => {
  const selectedSubject = useSelector(selectSelectedSubject);

  return (
    <div className="w-full">
      <div className="text-3xl text-slate-600">
        {selectedSubject?.code + " - " + selectedSubject?.description}
      </div>
      <div className="w-full border mt-6 border-slate-300" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-gray-700">Cursada</label>
          <select className="mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm hover:cursor-pointer border-slate-300 focus:outline-none focus:border-indigo-500">
            <option>Primer cuatrimestre - 2023</option>
          </select>
        </div>
        <div>
          <div className="mt-1 block w-full px-3 py-2 select-none"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="md:col-span-2">
          <label className="block text-gray-700">Examenes</label>
          <input className="mt-1 block w-full h-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="md:col-span-1">
          <div>
            <label className="block text-gray-700">Estado</label>
            <input
              className="mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              placeholder="What’s the BP #"
            />
          </div>
          <div>
            <label className="mt-4 block text-gray-700">Nota final</label>
            <select className="mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 focus:outline-none focus:border-indigo-500">
              <option>10 (Diez)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedEditBody;
