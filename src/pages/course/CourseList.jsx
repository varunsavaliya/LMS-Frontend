import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CourseListItem } from "../../components/course/CourseListItem";
import HomeLayout from "../../layouts/HomeLayout";
import {
  getCourses,
  useSelectorCourseState,
} from "../../redux/slices/CourseSlice";

export const CourseList = () => {
  const dispatch = useDispatch();
  const { activeCourses } = useSelectorCourseState();

  async function getAllCourses() {
    await dispatch(getCourses());
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <HomeLayout>
      <div className="container-wrapper pt-12 flex justify-center items-center flex-col gap-10 text-white">
        <h1 className="text-center text-3xl font-semibold mb-5">
          Explore the courses made by
          <span className="font-bold text-yellow-500"> Industry Experts</span>
        </h1>
        <div className="mb-10 flex flex-wrap gap-14 justify-center items-center">
          {!activeCourses.length && <span>No Courses to Display</span>}
          {activeCourses?.map((element) => {
            return <CourseListItem key={element._id} details={element} />;
          })}
        </div>
      </div>
    </HomeLayout>
  );
};
