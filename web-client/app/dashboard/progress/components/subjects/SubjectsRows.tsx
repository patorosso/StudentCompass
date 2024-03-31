"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import { useSearchParams } from "next/navigation";
import { selectAllSubjects, fetchSubjects } from "@/lib/features/subjectsSlice";
import { joinClassNames, getStatusStyle } from "../../../../utils/helpers";

const SubjectsRows = () => {
  const dispatch = useAppDispatch();
  const subjects = useSelector(selectAllSubjects);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (subjects.length === 0) {
      let student = searchParams.get("studentId");
      let career = searchParams.get("careerPlanId");
      dispatch(fetchSubjects({ student, career }));
    }
  }, [subjects]);

  return (
    <tbody>
      {subjects.map((subject) => (
        <tr key={subject.code} className="cursor-pointer hover:text-second">
          <td className="border-b dark:border-gray-700 p-4">{subject.code}</td>
          <td className="border-b dark:border-gray-700 p-4">
            {subject.description}
          </td>
          <td className="border-b dark:border-gray-700 p-4 text-lg text-center">
            {subject.finalGrade ? subject.finalGrade : "-"}
          </td>
          <td className="border-b dark:border-gray-700 p-4 text-lg text-center">
            {subject.weeklyHours}hs
          </td>
          <td className={"border-b dark:border-gray-700 p-4"}>
            <div
              className={joinClassNames(
                getStatusStyle(subject.status),
                "rounded-md py-1 text-center shadow-lg text-gray-200"
              )}
            >
              {subject.status}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default SubjectsRows;
