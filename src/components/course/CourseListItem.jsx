import React from "react";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import { UserRole } from "../../constants/UserRole";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";

export const CourseListItem = ({ details }) => {
  const navigate = useNavigate();
  const { isLoggedIn, role, data } = useSelectorUserState();
  return (
    <div className="text-white w-[17rem] sm:w-[22rem] min-h-[452px] shadow-lg rounded-lg group overflow-hidden bg-zinc-700">
      <div className="overflow-hidden ">
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
              {details?.createdBy}
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
              {isLoggedIn && role === UserRole.Admin && (
                <button
                  onClick={() =>
                    navigate(AllRoutes.CreateCourse, { state: { ...details } })
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
