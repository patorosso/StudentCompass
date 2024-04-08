"use client";
import React from "react";
import Modal from "../../Modal";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import { selectEditStyle } from "@/lib/features/userSlice";
import {
  selectIsEditing,
  setDetailedModal,
  selectDetailedModal,
} from "@/lib/features/subjectsSlice";
import DetailedEditBody from "./DetailedEditBody";

const DetailedEdit = () => {
  const dispatch = useAppDispatch();
  const isEditing = useSelector(selectIsEditing);
  const editStyle = useSelector(selectEditStyle);
  const modalOpen = useSelector(selectDetailedModal);

  return (
    <div>
      {isEditing && editStyle === "Detailed" && (
        <Modal
          title="Edición detallada"
          width="800px"
          height="550px"
          isOpen={modalOpen}
          hasCancelIcon={true}
          hasCancelButton={false}
          onClose={() => dispatch(setDetailedModal(false))}
          onAccept={() => dispatch(setDetailedModal(false))}
        >
          <DetailedEditBody />
        </Modal>
      )}
    </div>
  );
};

export default DetailedEdit;
