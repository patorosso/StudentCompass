"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSelectedSubject } from "@/lib/features/subjectsSlice";
import { useAppDispatch } from "@/lib/hooks";
import CompleteCourse from "./CompleteCourse";
import IncompleteCourse from "./IncompleteCourse";
import NewCourse from "./NewCourse";
import {
  selectCourses,
  fetchCourses,
  selectSelectedCourse,
  setSelectedCourse,
} from "@/lib/features/coursesSlice";

const CoursesIndex = () => {
  const dispatch = useAppDispatch();
  const selectedCourse = useSelector(selectSelectedCourse);
  const selectedSubject = useSelector(selectSelectedSubject);

  const courses = getSubjectCourses(
    useSelector(selectCourses),
    selectedSubject!.code
  );

  useEffect(() => {
    if (courses === null)
      dispatch(fetchCourses({ subjectCode: selectedSubject!.code }));
    else dispatch(setSelectedCourse(courses[0]));
  }, []);

  const showCompleteCourse =
    selectedCourse &&
    selectedCourse.term !== null &&
    selectedCourse.year !== null;

  const showIncompleteCourse =
    selectedCourse &&
    (selectedCourse.term === null || selectedCourse.year === null);

  return (
    <div className="w-full">
      <div className="text-3xl text-slate-600 dark:text-white">
        {selectedSubject!.code + " - " + selectedSubject!.description}
      </div>
      <div className="w-full border mt-6 border-slate-300 dark:border-slate-500" />
      {showCompleteCourse ? (
        <CompleteCourse />
      ) : showIncompleteCourse ? (
        <IncompleteCourse />
      ) : (
        <NewCourse />
      )}
    </div>
  );
};

export default CoursesIndex;

const getSubjectCourses = (
  coursesDict: CoursesDict,
  subjectCode: number
): Course[] | null =>
  coursesDict.hasOwnProperty(subjectCode) ? coursesDict[subjectCode] : null;
