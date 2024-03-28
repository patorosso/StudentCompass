"use client";
import React, { useEffect } from "react";
import SubjectRows from "./SubjectRows";
import SubjectListTop from "./SubjectListTop";
import { useAppDispatch } from "@/lib/hooks";
import { selectAllSubjects, fetchSubjects } from "@/lib/features/subjectsSlice";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

const SubjectsList = () => {
  const dispatch = useAppDispatch();
  const subjects = useSelector(selectAllSubjects);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (subjects.length === 0) {
      let student = searchParams.get("studentId");
      let career = searchParams.get("careerPlanId");
      dispatch(fetchSubjects({student, career}));
    }
  }, []); // todo: add subjects to listen for changes

  return (
    <div>
      <div
        className="bg-gray-400 dark:bg-surface-300 bg-opacity-55 dark:bg-opacity-55 dark:text-white shadow-xl rounded-lg p-4"
        style={{ width: 920 }}
      >
        <SubjectListTop />
        <div
          className="overflow-auto custom-scrollbar pr-4"
          style={{ height: 610 }}
        >
          <table className="min-w-full border-collapse">
            <thead className="text-left text-white sticky top-0 bg-gray-600">
              <tr>
                <th className="p-4 rounded-l-lg">Código</th>
                <th className="p-4">Descripción</th>
                <th className="p-4">Nota</th>
                <th className="p-4">Horas</th>
                <th className="p-4">Disponible</th>
                <th className="p-4 rounded-r-lg">Estado</th>
              </tr>
            </thead>
            <tbody>
              <SubjectRows subjects={subjects} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubjectsList;
