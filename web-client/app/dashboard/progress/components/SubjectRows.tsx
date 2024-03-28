"use client";
import React, {useEffect} from "react";
import { useAppDispatch } from "@/lib/hooks";
import { selectAllSubjects, fetchSubjects } from "@/lib/features/subjectsSlice";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

const SubjectRows = () => {

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
    <>
      {subjects.map((subject) => (
        <tr key={subject.code} className="cursor-pointer hover:text-second">
          <td className="border-b dark:border-gray-700 p-4">{subject.code}</td>
          <td className="border-b dark:border-gray-700 p-4">
            {subject.description}
          </td>
          <td className="border-b dark:border-gray-700 p-4">
            {subject.finalGrade ? subject.finalGrade : "-"}
          </td>
          <td className="border-b dark:border-gray-700 p-4">
            {subject.weeklyHours}
          </td>
          <td className="border-b dark:border-gray-700 p-4">
            {subject.isAvailable ? "Yes" : "No"}
          </td>
          <td className="border-b dark:border-gray-700 p-4">
            {subject.status}
          </td>
        </tr>
      ))}
    </>
  );
};

export default SubjectRows;
