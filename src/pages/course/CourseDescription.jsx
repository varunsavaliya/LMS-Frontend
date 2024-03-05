import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { UserRole } from "../../constants/UserRole";
import HomeLayout from "../../layouts/HomeLayout";
import { getLoggedInUser } from "../../redux/slices/AuthSlice";

export const CourseDescription = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [data, setData] = useState({});

  async function getUserData() {
    const response = await dispatch(getLoggedInUser());
    if (response?.payload?.success) {
      setData(response.payload.data);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <HomeLayout>
      <div className="container m-auto min-h-[90vh] pt-12 md:px-5 px-9 flex flex-col justify-center items-center text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 relative">
          <div className="space-y-5">
            <img
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
              className="w-full h-[45vh] object-cover"
            />
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-between text-xl gap-3">
                <p className="font-semibold ">
                  <span className="text-yellow-500 font-bold">
                    Total Lectures :{" "}
                  </span>
                  {state?.numbersOfLectures}
                </p>

                <p className="font-semibold ">
                  <span className="text-yellow-500 font-bold">
                    Instructor :{" "}
                  </span>
                  {state?.createdBy}
                </p>

                {role === UserRole.Admin ||
                data?.subscription?.status === "ACTIVE" ? (
                  <button className="bg-yellow-600 text-xl rounded-md font-bold py-2 px-5 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    Watch Lectures
                  </button>
                ) : (
                  <button className="bg-yellow-600 text-xl rounded-md font-bold py-2 px-5 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2 text-xl text-center md:text-left">
            <h1 className="text-3xl font-bold text-yellow-500 mb-5">
              {state?.title}
            </h1>
            <p className="text-yellow-500"> Course Description: </p>
            <p className="text-base sm:text-lg">{state?.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};
