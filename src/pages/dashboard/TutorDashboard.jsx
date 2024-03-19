import React, { useEffect } from "react";
import { CourseTable } from "../../components/course/CourseTable";
import HomeLayout from "../../layouts/HomeLayout";
import {
  getTutorCourses,
  useSelectorCourseState,
} from "../../redux/slices/CourseSlice";

export const TutorDashboard = () => {
  const { tutorCourses } = useSelectorCourseState();

  useEffect(() => {
    (async () => {
      await dispatch(getTutorCourses());
    })();
  }, []);
  return (
    <HomeLayout>
      <CourseTable courses={tutorCourses} />
    </HomeLayout>
  );
};
