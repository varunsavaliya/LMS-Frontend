import React from "react";
import { useNavigate } from "react-router-dom";

export const CourseListItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="text-white w-[17rem] sm:w-[22rem] min-h-[452px] shadow-lg rounded-lg group overflow-hidden bg-zinc-700">
      <div className="overflow-hidden ">
        <img
          className="h-48 w-full rounded-tl-lg rounded-tr-lg object-cover group-hover:scale=[1,2] transition-all ease-in-out duration-200"
          src={data?.thumbnail?.secure_url}
          alt="Course Thumbnail"
        />
        <div className="p-3  text-white">
          <div className="flex flex-col space-y-2">
            <h2
              className="text-xl font-bold text-yellow-500 line-clamp-2 cursor-pointer"
              onClick={() => navigate("/course/description/", { state: data })}
            >
              {data?.title}
            </h2>
            <p className="line-clamp-2">{data?.description}</p>
            <p className="font-semibold">
              <span className="text-yellow-500 font-bold"> Category : </span>
              {data?.category}
            </p>
            <p className="font-semibold">
              <span className="text-yellow-500 font-bold">
                Total Lectures :{" "}
              </span>
              {data?.numbersOfLectures}
            </p>
            <p className="font-semibold">
              <span className="text-yellow-500 font-bold">Instructor : </span>
              {data?.createdBy}
            </p>

            <div className="flex justify-between items-center">
              <button
                className="btn"
                onClick={() => navigate("/course/description", { state: data })}
              >
                See Course
              </button>
              <button className="btn bg-transparent border-2 hover:bg-gray-800">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
