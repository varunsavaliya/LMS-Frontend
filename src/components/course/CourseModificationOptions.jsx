import { AllRoutes } from "../../constants/Routes";
import {
  deleteCourse,
  getCourses,
  getTutorCourses,
} from "../../redux/slices/CourseSlice";
import { Messages } from "../../constants/Messages";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../constants/UserRole";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";

export const CourseModificationOptions = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelectorUserState();
  const options = [
    {
      title: "See Course",
      handler: () =>
        navigate(AllRoutes.CourseDescription, {
          state: { ...course },
        }),
    },
    {
      title: "See Lectures",
      handler: () =>
        navigate(AllRoutes.CourseLectures, {
          state: { ...course },
        }),
    },
    {
      title: "Add Lectures",
      handler: () =>
        navigate(AllRoutes.AddLecture, {
          state: { courseDetails: course },
        }),
    },
    {
      title: "Edit Course",
      handler: () =>
        navigate(AllRoutes.CreateCourse, {
          state: { ...course },
        }),
    },
    {
      title: "Delete Course",
      handler: () => handleCourseDelete(course?._id),
    },
  ];

  async function handleCourseDelete(id) {
    if (window.confirm(Messages.Confirm.Course.Delete)) {
      const res = await dispatch(deleteCourse(id));
      if (res.payload?.success) {
        await dispatch(getCourses());
        role === UserRole.Tutor && (await dispatch(getTutorCourses()));
      }
    }
  }

  return (
    <div id="menu-dropdown" className="dropdown dropdown-top dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="after:content-['\2807'] text-2xl"
      ></div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow rounded-box w-max bg-gray-700"
      >
        {options.map((option) => (
          <li key={option.title}>
            <button
              className="rounded-md font-semibold"
              onClick={option.handler}
            >
              {option.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
