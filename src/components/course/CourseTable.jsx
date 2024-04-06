import { CourseModificationOptions } from "./CourseModificationOptions";
import { CourseStatus } from "../../constants/CourseStatus";
import { getCourses, updateCourse } from "../../redux/slices/CourseSlice";
import { useDispatch } from "react-redux";
import { UserRole } from "../../constants/UserRole";
import { useSelectorOptionsState } from "../../redux/slices/OptionsSlice";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";
import { CustomButton } from "../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";

export const CourseTable = ({ courses }) => {
  const { users } = useSelectorOptionsState();
  const { role } = useSelectorUserState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleChangeStatus(event, id) {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", event.target.value);
    const res = await dispatch(updateCourse(formData));
    if (res.payload?.success) {
      await dispatch(getCourses());
    }
  }

  function getClassesForCourseStatus(status) {
    let classes = "p-2 rounded-lg ";
    if (status === CourseStatus.Approved) classes += "bg-green-600 ";
    else if (status === CourseStatus.Pending) classes += "bg-yellow-600 ";
    else if (status === CourseStatus.Declined) classes += "bg-red-600 ";
    return classes;
  }

  function getClassesForCourseStatusSelect(status) {
    let classes = "select w-max select-xs ";
    if (status === CourseStatus.Approved) classes += "select-success ";
    else if (status === CourseStatus.Pending) classes += "select-warning ";
    else if (status === CourseStatus.Declined) classes += "select-error ";
    return classes;
  }

  return (
    <div className="w-full self-center flex flex-col items-center justify-center gap-10 my-3">
      <div className="flex w-full items-center justify-between text-white">
        <h1 className="text-center xs:text-lg md:text-3xl font-semibold">
          Courses overview
        </h1>
        <CustomButton
          title="Create new course"
          clickHandler={() => navigate(AllRoutes.CreateCourse)}
          width="fit"
        />
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table md:table-auto table-xs table-pin-rows text-white max-h-min">
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
                    {role === UserRole.Admin ? (
                      <select
                        value={course?.status}
                        className={getClassesForCourseStatusSelect(
                          course?.status
                        )}
                        onChange={($event) =>
                          handleChangeStatus($event, course?._id)
                        }
                      >
                        <option disabled>Change Status</option>
                        {Object.values(CourseStatus).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={getClassesForCourseStatus(course?.status)}
                      >
                        {course?.status}
                      </span>
                    )}
                  </td>
                  <td className="flex items-center gap-4">
                    <CourseModificationOptions course={course} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
