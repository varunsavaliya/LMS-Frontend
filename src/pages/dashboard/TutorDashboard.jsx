import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CourseTable } from "../../components/course/CourseTable";
import HomeLayout from "../../layouts/HomeLayout";
import {
  getTutorCourses,
  useSelectorCourseState,
} from "../../redux/slices/CourseSlice";

export const TutorDashboard = () => {
  const { tutorCourses } = useSelectorCourseState();
  const dispatch = useDispatch();
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
