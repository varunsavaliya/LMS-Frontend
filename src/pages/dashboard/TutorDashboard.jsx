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
import { StatsItem } from "../../components/dashboard/StatsItem";

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
        <h1 className="text-center text-2xl md:text-5xl font-semibold text-yellow-500">
          Tutor Dashboard
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-5">
          <StatsItem number={tutorCourses?.length} title="Total Courses">
            <LuBookOpen className="text-3xl lg:text-5xl" />
          </StatsItem>
          <StatsItem
            number={
              tutorCourses?.filter((c) => c.status === CourseStatus.Approved)
                .length
            }
            title="Approved Courses"
          >
            <LuBookOpenCheck className="text-green-500 text-3xl lg:text-5xl" />
          </StatsItem>
          <StatsItem
            number={
              tutorCourses?.filter((c) => c.status === CourseStatus.Pending)
                .length
            }
            title="Pending Approvals"
          >
            <LuBookOpen className="text-yellow-500 text-3xl lg:text-5xl" />
          </StatsItem>
          <StatsItem
            number={tutorCourses
              ?.filter((c) => c.status === CourseStatus.Approved)
              .reduce(
                (total, course) => total + (course.lectures?.length || 0),
                0
              )}
            title="Active Lectures"
          >
            <TiVideo className="text-green-500 text-3xl lg:text-5xl" />
          </StatsItem>
        </div>
        <CourseTable courses={tutorCourses} />
      </div>
    </HomeLayout>
  );
};
