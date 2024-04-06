import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import {
  deleteCourseLectures,
  getCourseLectures,
  useSelectorLectureState,
} from "../../redux/slices/LectureSlice";
import HomeLayout from "../../layouts/HomeLayout";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";
import { UserRole } from "../../constants/UserRole";
import { BackButton } from "../../components/shared/BackButton";

export const CourseLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = useSelectorUserState();
  const { lectures } = useSelectorLectureState();
  const { role } = useSelectorUserState();

  async function fetchCourseLectures() {
    await dispatch(getCourseLectures(state._id));
  }

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    const res = await dispatch(
      deleteCourseLectures({ courseId: courseId, lectureId: lectureId })
    );
    if (res.payload?.success) {
      await dispatch(getCourseLectures(courseId));
    }
  }

  useEffect(() => {
    if (!state) navigate(AllRoutes.Courses);
    fetchCourseLectures();
  }, []);
  return (
    <HomeLayout>
      <div className="container-wrapper flex-col gap-10 text-white">
        <div className="flex justify-center items-center gap-5">
          <BackButton state={state} />
          <div className="text-center text-xl md:text-3xl font-semibold text-yellow-500">
            {state?.title}
          </div>
        </div>
        {lectures && !lectures.length && role !== UserRole.Admin && (
          <span>No lectures to show</span>
        )}
        {lectures && lectures.length ? (
          <div className="flex justify-center flex-col md:flex-row gap-10 w-full">
            {/* left section for playing videos and displaying course details to admin */}
            <div className="space-y-5 w-full md:w-1/2 p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video>
              <div>
                <h1 className=" text-sm md:text-base">
                  <span className="text-yellow-500"> Title: </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p className=" text-sm md:text-base">
                  <span className="text-yellow-500 line-clamp-4">
                    Description:{" "}
                  </span>
                  {lectures && lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* right section for displaying list of lectures */}
            <div className="flex flex-col text-base md:text-xl w-full md:w-[28rem] p-3 rounded-lg shadow-[0_0_10px_black] gap-y-3">
              <div className="font-semibold text-yellow-500 flex items-center justify-between">
                <p>Lectures list</p>
                {(role === UserRole.Admin || data?._id === state.createdBy) && (
                  <button
                    onClick={() =>
                      navigate(AllRoutes.AddLecture, {
                        state: { courseDetails: state },
                      })
                    }
                    className="btn btn-info px-1 md:px-3 p-0 md:py-1 rounded-md font-semibold text-sm"
                  >
                    Add new lecture
                  </button>
                )}
              </div>
              <ul className="flex flex-col gap-y-3 max-h-[428px] overflow-y-auto">
                {lectures &&
                  lectures.map((lecture, idx) => {
                    return (
                      <li
                        className="flex flex-col justify-start items-start bg-gray-800 p-3 rounded-lg"
                        key={lecture._id}
                      >
                        <p
                          className="cursor-pointer text-sm md:text-base"
                          onClick={() => setCurrentVideo(idx)}
                        >
                          <span> Lecture {idx + 1} : </span>
                          {lecture?.title}
                        </p>
                        {(role === UserRole.Admin ||
                          data?._id === state.createdBy) && (
                          <div className="flex justify-between items-center w-full py-1">
                            <button
                              onClick={() =>
                                navigate(AllRoutes.AddLecture, {
                                  state: {
                                    courseDetails: state,
                                    lectureDetails: lecture,
                                  },
                                })
                              }
                              className="underline text-blue-400 text-xs md:text-sm font-bold m-0 p-0"
                            >
                              Edit lecture
                            </button>
                            <button
                              onClick={() =>
                                onLectureDelete(state?._id, lecture?._id)
                              }
                              className="underline text-red-500 text-xs md:text-sm font-bold m-0 p-0"
                            >
                              Delete lecture
                            </button>
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        ) : (
          (role === UserRole.Admin || data?._id === state.createdBy) && (
            <button
              onClick={() =>
                navigate(AllRoutes.AddLecture, {
                  state: { courseDetails: state },
                })
              }
              className="btn btn-neutral px-4 py-1 rounded-md font-semibold text-sm"
            >
              Add new lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  );
};
