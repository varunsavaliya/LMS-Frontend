import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import {
  deleteCourseLectures,
  getCourseLectures,
  useSelectorLectureState,
} from "../../redux/slices/LectureSlice";
import HomeLayout from "../../layouts/HomeLayout";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";
import { UserRole } from "../../constants/UserRole";

export const CourseLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { lectures } = useSelectorLectureState();
  const { role } = useSelectorUserState();

  async function fetchCourseLectures() {
    await dispatch(getCourseLectures(state._id));
  }

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    console.log(courseId, lectureId);
    await dispatch(
      deleteCourseLectures({ courseId: courseId, lectureId: lectureId })
    );
    await dispatch(getCourseLectures(courseId));
  }

  useEffect(() => {
    if (!state) navigate(AllRoutes.Courses);
    fetchCourseLectures();
  }, []);
  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name: {state?.title}
        </div>
        {lectures && !lectures.length && role !== UserRole.Admin && (
          <span>No lectures to show</span>
        )}
        {lectures && lectures.length ? (
          <div className="flex justify-center gap-10 w-full">
            {/* left section for playing videos and displaying course details to admin */}
            <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video>
              <div>
                <h1>
                  <span className="text-yellow-500"> Title: </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p>
                  <span className="text-yellow-500 line-clamp-4">
                    Description:{" "}
                  </span>
                  {lectures && lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* right section for displaying list of lectures */}
            <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures list</p>
                {role === UserRole.Admin && (
                  <button
                    onClick={() =>
                      navigate(AllRoutes.AddLecture, { state: { ...state } })
                    }
                    className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                  >
                    Add new lecture
                  </button>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li className="space-y-2" key={lecture._id}>
                      <p
                        className="cursor-pointer"
                        onClick={() => setCurrentVideo(idx)}
                      >
                        <span> Lecture {idx + 1} : </span>
                        {lecture?.title}
                      </p>
                      {role === UserRole.Admin && (
                        <button
                          onClick={() =>
                            onLectureDelete(state?._id, lecture?._id)
                          }
                          className="btn-accent px-2 py-1 rounded-md font-semibold text-sm"
                        >
                          Delete lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          role === UserRole.Admin && (
            <button
              onClick={() =>
                navigate(AllRoutes.AddLecture, { state: { ...state } })
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
