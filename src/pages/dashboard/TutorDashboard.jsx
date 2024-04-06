import { CourseStatus } from "../../constants/CourseStatus";
import { CourseTable } from "../../components/course/CourseTable";
import {
  getTutorCourses,
  useSelectorCourseState,
} from "../../redux/slices/CourseSlice";
import { LuBookOpen } from "react-icons/lu";
import { LuBookOpenCheck } from "react-icons/lu";
import { TiVideo } from "react-icons/ti";
import { useDispatch } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import React, { useEffect } from "react";

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
      <div className="container-wrapper flex-col">
        <h1 className="my-3 text-center text-5xl font-semibold text-yellow-500">
          Tutor Dashboard
        </h1>
        <div className="grid grid-cols-4 gap-5 my-5">
          <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Total Courses</p>
              <h3 className="text-4xl font-bold">{tutorCourses?.length}</h3>
            </div>
            <LuBookOpen className="text-5xl" />
          </div>
          <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Approved Courses</p>
              <h3 className="text-4xl font-bold text-green-500">
                {
                  tutorCourses?.filter(
                    (c) => c.status === CourseStatus.Approved
                  ).length
                }
              </h3>
            </div>
            <LuBookOpenCheck className="text-green-500 text-5xl" />
          </div>
          <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Pending Approvals</p>
              <h3 className="text-4xl font-bold text-yellow-500">
                {
                  tutorCourses?.filter((c) => c.status === CourseStatus.Pending)
                    .length
                }
              </h3>
            </div>
            <LuBookOpen className="text-yellow-500 text-5xl" />
          </div>
          <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Total Active Lectures</p>
              <h3 className="text-4xl font-bold text-green-500">
                {tutorCourses
                  ?.filter((c) => c.status === CourseStatus.Approved)
                  .reduce(
                    (total, course) => total + (course.lectures?.length || 0),
                    0
                  )}
              </h3>
            </div>
            <TiVideo className="text-green-500 text-5xl" />
          </div>
        </div>
        <CourseTable courses={tutorCourses} />
      </div>
    </HomeLayout>
  );
};
