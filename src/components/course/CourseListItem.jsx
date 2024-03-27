import { AllRoutes } from "../../constants/Routes";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../constants/UserRole";
import { useSelectorOptionsState } from "../../redux/slices/OptionsSlice";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";
import React from "react";

export const CourseListItem = ({ details }) => {
  const navigate = useNavigate();
  const { isLoggedIn, role, data } = useSelectorUserState();
  const { users } = useSelectorOptionsState();
  return (
    <div className="text-white w-[17rem] sm:w-[22rem] min-h-[452px] shadow-lg rounded-lg group overflow-hidden bg-zinc-700">
      <div className="overflow-hidden relative z-30">
        {details?.createdBy === data?._id && (
          <span className="absolute flex justify-center items-center gap-1 bg-yellow-600 right-2 top-2 px-2 rounded-lg">
            Your Course
            <div
              className="tooltip tooltip-left"
              data-tip="You can edit course or add lectures"
            >
              <IoInformationCircleSharp className="cursor-pointer" />
            </div>
          </span>
        )}
        <img
          className="h-48 w-full rounded-tl-lg rounded-tr-lg object-cover group-hover:scale=[1,2] transition-all ease-in-out duration-200"
          src={details?.thumbnail?.secure_url}
          alt="Course Thumbnail"
        />
        <div className="p-3  text-white">
          <div className="flex flex-col gap-3">
            <h2
              className="text-xl font-bold text-yellow-500 line-clamp-2 cursor-pointer"
              onClick={() =>
                navigate(AllRoutes.CourseDescription, { state: details })
              }
            >
              {details?.title}
            </h2>
            <p className="line-clamp-2">{details?.description}</p>
            <p className="font-semibold">
              <span className="text-yellow-500 font-bold"> Category : </span>
              {details?.category}
            </p>
            <p className="font-semibold">
              <span className="text-yellow-500 font-bold">
                Total Lectures :{" "}
              </span>
              {details?.lectures?.length ?? 0}
            </p>
            <p className="font-semibold">
              <span className="text-yellow-500 font-bold">Instructor : </span>
              {users.find((u) => u._id === details?.createdBy)?.fullName}
            </p>

            <div className="flex justify-between items-center">
              <button
                className="btn"
                onClick={() =>
                  navigate(AllRoutes.CourseDescription, { state: details })
                }
              >
                See Course
              </button>
              {isLoggedIn &&
                (role === UserRole.Admin ||
                  details?.createdBy === data?._id) && (
                  <button
                    onClick={() =>
                      navigate(AllRoutes.CreateCourse, {
                        state: { ...details },
                      })
                    }
                    className="btn bg-transparent border-2 hover:bg-gray-800"
                  >
                    Edit Course
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
