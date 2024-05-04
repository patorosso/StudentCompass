"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import { useSearchParams } from "next/navigation";
import { selectEditStyle } from "@/lib/features/userSlice";
import { selectAllSubjects, fetchSubjects } from "@/lib/features/subjectsSlice";
import FastEditRows from "./rows/FastEditRows";
import DetailedEditRows from "./rows/DetailedEditRows";

const SubjectsRows = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const editStyle = useSelector(selectEditStyle);
  const subjects = useSelector(selectAllSubjects);

  useEffect(() => {
    if (subjects.length === 0) {
      let student = searchParams.get("studentId");
      let career = searchParams.get("careerPlanId");
      dispatch(fetchSubjects({ student, career }));
    }
  }, []);

  return (
    <tbody>
      {editStyle === "Fast" ? (
        <FastEditRows subjects={subjects} />
      ) : (
        <DetailedEditRows subjects={subjects} />
      )}
    </tbody>
  );
};

export default SubjectsRows;
