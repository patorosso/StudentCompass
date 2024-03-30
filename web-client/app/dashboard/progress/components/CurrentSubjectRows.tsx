"use client";
import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { useAppDispatch } from "@/lib/hooks";
import {
  selectAllSubjects,
  addCurrentSubjects,
} from "@/lib/features/subjectsSlice";
import { useSelector } from "react-redux";
import { joinClassNames } from "@/app/utils/helpers";

type AddCurrentSubjectsType = {
  student: string;
  subjects: Subject[];
};

const CurrentSubjectRows = () => {
  const dispatch = useAppDispatch();
  const subjects = useSelector(selectAllSubjects);

  const [addSubjectModalOpen, setAddSubjectModalOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);

  const currentSubjects = subjects.filter(
    (subject) => subject.status === "Cursando"
  );

  const availableSubjects = subjects.filter(
    (subject) => subject.status === "Disponible"
  );

  const onAddCurrentSubject = () => {
    setAddSubjectModalOpen(true);
  };

  const onSubjectSelection = (subject: Subject) => {
    if (selectedSubjects.filter((x) => x.code === subject.code).length === 1) {
      setSelectedSubjects(
        selectedSubjects.filter((x) => x.code !== subject.code)
      );
      return;
    }
    setSelectedSubjects([...selectedSubjects, subject]);
  };

  const closeModal = () => {
    setSelectedSubjects([]);
    setAddSubjectModalOpen(false);
  };

  const acceptModal = () => {
    let props: AddCurrentSubjectsType = {
      student: "1",
      subjects: selectedSubjects,
    };
    dispatch(addCurrentSubjects(props));
    closeModal();
  };

  return (
    <div
      className="px-4 min-h-96" //overflow-auto custom-scrollbar
    >
      <table className="min-w-full border-collapse">
        <thead className="text-left text-sm text-white sticky top-0 border-b-[1px]">
          <tr>
            <th className="py-4">Descripción</th>
            <th className="py-4">1°</th>
            <th className="py-4">2°</th>
            <th className="py-4">Rec.</th>
            <th className="py-4">Final</th>
          </tr>
        </thead>
        <tbody>
          {currentSubjects.map((subject) => (
            <tr key={subject.code} className="cursor-pointer hover:text-second">
              <td className="border-b dark:border-gray-700 py-4 text-sm">
                {subject.description}
              </td>
              <td className="border-b dark:border-gray-700 py-4 text-sm">
                {subject.exams &&
                  subject.exams
                    .filter((grade) => grade.description === "Primer parcial")
                    .at(-1)?.grade}
              </td>
              <td className="border-b dark:border-gray-700 py-4 text-sm">
                {subject.exams &&
                  subject.exams
                    .filter((grade) => grade.description === "Segundo parcial")
                    .at(-1)?.grade}
              </td>
              <td className="border-b dark:border-gray-700 py-4 text-sm">
                {subject.exams &&
                  subject.exams
                    .filter((grade) => grade.description === "Recuperatorio")
                    .at(-1)?.grade}
              </td>
              <td className="border-b dark:border-gray-700 py-4 text-sm">
                {subject.exams &&
                  subject.exams
                    .filter((grade) => grade.description === "Final")
                    .at(-1)?.grade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentSubjects.length === 0 && (
        <div className="flex flex-col items-center pt-16">
          <button
            onClick={() => onAddCurrentSubject()}
            className="bg-surface-300 hover:bg-surface-400 text-gray-500 rounded-full w-20 h-20 flex items-center justify-center select-none opacity-50 hover:opacity-100"
          >
            <Image
              src="/add.svg"
              alt="Toggle Sidebar"
              width={48}
              height={48}
              className="invert"
            />
          </button>
          <div className="pt-4">Agregar</div>
        </div>
      )}
      <Modal
        isOpen={addSubjectModalOpen}
        onClose={closeModal}
        onAccept={acceptModal}
        title="Agregar materias en curso"
        subtitle="Se recuerda que la cantidad máxima en simultáneo es de 6 materias."
      >
        <div className="grid grid-cols-1 gap-y-4 px-16">
          {availableSubjects.map((subject) => (
            <button
              key={subject.code}
              className={joinClassNames(
                selectedSubjects.filter((x) => x.code === subject.code)
                  ?.length === 1
                  ? "bg-primary"
                  : "bg-gray-400",
                "p-4 rounded-lg text-white hover:bg-second cursor-pointer"
              )}
              onClick={() => onSubjectSelection(subject)}
            >
              {subject.description}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default CurrentSubjectRows;
