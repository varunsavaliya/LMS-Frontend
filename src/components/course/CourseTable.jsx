import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CourseStatus } from "../../constants/CourseStatus";
import { AllRoutes } from "../../constants/Routes";
import {
  deleteCourse,
  getCourses,
  getTutorCourses,
} from "../../redux/slices/CourseSlice";
import { useSelectorOptionsState } from "../../Redux/Slices/OptionsSlice";

export const CourseTable = ({ courses }) => {
  const { users } = useSelectorOptionsState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete this course ?")) {
      const res = await dispatch(deleteCourse(id));
      if (res.payload?.success) {
        await dispatch(getCourses());
        await dispatch(getTutorCourses());
      }
    }
  }
  function getClassesForCourseStatus(status) {
    let classes = "p-2 rounded-lg ";
    if (status === CourseStatus.Approved) classes += "bg-green-600 ";
    else if (status === CourseStatus.Pending) classes += "bg-yellow-600 ";
    else if (status === CourseStatus.Declined) classes += "bg-red-600 ";
    return classes;
  }
  return (
    <div className="overflow-auto w-full">
      <table className="table table-pin-rows text-white">
        <thead>
          <tr>
            <th>S No</th>
            <th>Course Title</th>
            <th>Course Category</th>
            <th>Instructor</th>
            <th>Total Lectures</th>
            <th>Description</th>
            <th>status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course, idx) => {
            return (
              <tr key={course._id}>
                <td>{idx + 1}</td>
                <td className="max-w-xs truncate">{course?.title}</td>
                <td>{course?.category}</td>
                <td>
                  {users.find((u) => u._id === course?.createdBy)?.fullName}
                </td>
                <td>{course?.lectures?.length ?? 0}</td>
                <td className="max-w-xs truncate">{course?.description}</td>
                <td>
                  <span className={getClassesForCourseStatus(course?.status)}>
                    {course?.status}
                  </span>
                </td>
                <td className="flex items-center gap-4">
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="after:content-['\2807'] text-2xl"
                    ></div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button
                          className="rounded-md font-semibold"
                          onClick={() =>
                            navigate(AllRoutes.CourseDescription, {
                              state: { ...course },
                            })
                          }
                        >
                          See Course
                        </button>
                      </li>
                      <li>
                        <button
                          className="rounded-md font-semibold"
                          onClick={() =>
                            navigate(AllRoutes.CourseLectures, {
                              state: { ...course },
                            })
                          }
                        >
                          See Lectures
                        </button>
                      </li>
                      <li>
                        <button
                          className="rounded-md font-semibold"
                          onClick={() => handleCourseDelete(course?._id)}
                        >
                          Delete Course
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
