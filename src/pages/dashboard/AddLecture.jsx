import {
  addCourseLectures,
  updateCourseLectures,
} from "../../redux/slices/LectureSlice";
import { AllRoutes } from "../../constants/Routes";
import { BackButton } from "../../components/shared/BackButton";
import { FileExtensions } from "../../constants/FileExtensions";
import { isEqual } from "lodash";
import { Messages } from "../../constants/Messages";
import { showToaster } from "../../utils/ToasterService";
import { ToasterType } from "../../constants/ToasterType";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateHandler } from "../../hooks/shared/useStateHandler";
import HomeLayout from "../../layouts/HomeLayout";
import { SubmitButton } from "../../components/shared/SubmitButton";

export const AddLecture = () => {
  const { courseDetails, lectureDetails } = useLocation().state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, handleInputChange, setUserInput] = useStateHandler({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleVideo(e) {
    const video = e.target.files[0];
    const fileName = video.name;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    if (!FileExtensions.Lecture.includes(fileExtension)) {
      showToaster(ToasterType.Error, Messages.Error.File);
      return;
    }
    const source = window.URL.createObjectURL(video);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!lectureDetails && !userInput.lecture) {
      showToaster(ToasterType.Error, Messages.Validation.Lecture.Video);
      return;
    }
    if (!userInput.title || !userInput.description) {
      showToaster(ToasterType.Error, Messages.Validation.AllDetailsMandatory);
      return;
    }
    const response = lectureDetails?._id
      ? await dispatch(
          updateCourseLectures({ ...userInput, lectureId: lectureDetails._id })
        )
      : await dispatch(addCourseLectures(userInput));
    if (response?.payload?.success) {
      navigate(AllRoutes.CourseLectures, { state: courseDetails });
      setUserInput({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  }

  function setLectureDetails() {
    setUserInput({
      ...userInput,
      title: lectureDetails.title,
      description: lectureDetails.description,
      videoSrc: lectureDetails.lecture?.secure_url,
    });
  }

  function isSubmitButtonDisabled() {
    const oldDetails = {
      title: lectureDetails?.title,
      description: lectureDetails?.description,
      video: lectureDetails?.lecture?.secure_url,
    };
    const newDetails = {
      title: userInput?.title,
      description: userInput?.description,
      video: userInput?.videoSrc,
    };
    return isEqual(oldDetails, newDetails);
  }

  useEffect(() => {
    if (!courseDetails) navigate(AllRoutes.Courses);
    if (lectureDetails) setLectureDetails();
  }, []);

  return (
    <HomeLayout>
      <div className="container-wrapper text-white">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
          <header className="flex items-center justify-start gap-5">
            <BackButton state={courseDetails} />
            <h1 className="text-xl text-yellow-500 font-semibold">
              Add new lecture
            </h1>
          </header>
          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              placeholder="enter the title of the lecture"
              onChange={handleInputChange}
              className="bg-transparent px-3 py-1 border"
              value={userInput.title}
            />
            <textarea
              type="text"
              name="description"
              placeholder="enter the description of the lecture"
              onChange={handleInputChange}
              className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
              value={userInput.description}
            />
            {userInput.videoSrc ? (
              <>
                <video
                  muted
                  src={userInput.videoSrc}
                  controls
                  controlsList="nodownload nofullscreen"
                  disablePictureInPicture
                  className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                ></video>
                <label
                  className="cursor-pointer text-sm text-blue-400 underline"
                  htmlFor="lecture"
                >
                  Replace Video
                </label>
              </>
            ) : (
              <div className="h-48 border flex items-center justify-center cursor-pointer">
                <label
                  className="cursor-pointer flex font-semibold h-full items-center justify-center m-auto text-cl w-full"
                  htmlFor="lecture"
                >
                  Choose your video
                </label>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              id="lecture"
              name="lecture"
              onChange={handleVideo}
              accept=".mp4"
            />
            <SubmitButton
              disabled={isSubmitButtonDisabled()}
              title={lectureDetails ? "Update Lecture" : "Add new Lecture"}
            />
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};
