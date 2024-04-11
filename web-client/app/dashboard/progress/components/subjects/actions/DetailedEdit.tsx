"use client";
import React from "react";
import Modal from "../../Modal";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import { selectEditStyle } from "@/lib/features/userSlice";
import {
  setSelectedSubject,
  selectIsEditing,
  setDetailedModal,
  selectDetailedModal,
} from "@/lib/features/subjectsSlice";
import { setSelectedCourse } from "@/lib/features/coursesSlice";
import Courses from "./Courses";

const DetailedEdit = () => {
  const dispatch = useAppDispatch();
  const isEditing = useSelector(selectIsEditing);
  const editStyle = useSelector(selectEditStyle);
  const modalOpen = useSelector(selectDetailedModal);

  const handleClose = () => {
    dispatch(setDetailedModal(false));
    dispatch(setSelectedSubject(undefined));
    dispatch(setSelectedCourse(null));
  };

  return (
    <div>
      {isEditing && editStyle === "Detailed" && (
        <Modal
          title="Vista detallada"
          width="800px"
          height="500px"
          isOpen={modalOpen}
          hasAcceptButton={false}
          hasCancelIcon={true}
          hasCancelButton={false}
          onClose={() => handleClose()}
        >
          <Courses />
        </Modal>
      )}
    </div>
  );
};

export default DetailedEdit;
