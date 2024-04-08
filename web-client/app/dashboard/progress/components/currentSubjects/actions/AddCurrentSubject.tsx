"use client";
import React, { useState } from "react";
import Image from "next/image";
import Modal from "../../Modal";
import { useAppDispatch } from "@/lib/hooks";
import { addCurrentSubjects } from "@/lib/features/subjectsSlice";
import { joinClassNames } from "@/app/utils/helpers";

interface AddCurrentSubjectProps {
  availableSubjects: Subject[];
}

type AddCurrentSubjectsType = {
  student: string;
  subjects: Subject[];
};

const AddCurrentSubject = ({ availableSubjects }: AddCurrentSubjectProps) => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);

  const onSelection = (subject: Subject) => {
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
    setModalOpen(false);
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
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-yellow-500 hover:bg-yellow-400 text-gray-500 rounded-full w-9 h-9 flex items-center justify-center select-none mr-3"
      >
        <Image
          src="/add.svg"
          alt="Toggle Sidebar"
          width={19}
          height={19}
          className=""
        />
      </button>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        onAccept={acceptModal}
        hasCancelButton={true}
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
              onClick={() => onSelection(subject)}
            >
              {subject.description}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default AddCurrentSubject;
