import { BackButton } from "../../components/shared/BackButton";
import { CustomInput } from "../../components/shared/CustomInput";
import { isEqual } from "lodash";
import { Messages } from "../../constants/Messages";
import { showToaster } from "../../utils/ToasterService";
import { ToasterType } from "../../constants/ToasterType";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserRole } from "../../constants/UserRole";
import { useSelectorOptionsState } from "../../redux/slices/OptionsSlice";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";
import { useStateHandler } from "../../hooks/shared/useStateHandler";
import HomeLayout from "../../layouts/HomeLayout";
import { createCourse, updateCourse } from "../../redux/slices/CourseSlice";
import { useDispatch } from "react-redux";
import { AllRoutes } from "../../constants/Routes";
import { SubmitButton } from "../../components/shared/SubmitButton";

export const CreateCourse = () => {
  const { state } = useLocation();
  const { role, data } = useSelectorUserState();
  const { users } = useSelectorOptionsState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialCourseState = {
    id: "",
    title: "",
    description: "",
    category: "",
    createdBy: role === UserRole.Admin ? "" : data?._id,
    thumbnail: null,
    previewImage: "",
  };

  const [courseDetails, handleUserInput, setCourseDetails] =
    useStateHandler(initialCourseState);

  function isSubmitButtonDisabled() {
    const oldDetails = {
      title: state?.title,
      createdBy: state?.createdBy,
      category: state?.category,
      description: state?.description,
      previewImage: state?.thumbnail?.secure_url,
    };
    const newDetails = {
      title: courseDetails?.title,
      createdBy: courseDetails?.createdBy,
      category: courseDetails?.category,
      description: courseDetails?.description,
      previewImage: courseDetails?.previewImage,
    };
    return isEqual(oldDetails, newDetails);
  }

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setCourseDetails({
          ...courseDetails,
          thumbnail: uploadedImage,
          previewImage: this.result,
        });
      });
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !courseDetails.title ||
      !courseDetails.description ||
      !courseDetails.category ||
      !courseDetails.createdBy
    ) {
      showToaster(ToasterType.Error, Messages.Validation.AllDetailsMandatory);
      return;
    }

    if (!courseDetails.id && !courseDetails.thumbnail) {
      showToaster(ToasterType.Error, Messages.Validation.Course.Thumbnail);
      return;
    }

    if (courseDetails.description.length < 8) {
      showToaster(ToasterType.Error, Messages.Validation.Course.Description);
      return;
    }

    const formData = new FormData();
    formData.append("title", courseDetails.title);
    formData.append("description", courseDetails.description);
    formData.append("category", courseDetails.category);
    formData.append("createdBy", courseDetails.createdBy);

    if (courseDetails.thumbnail)
      formData.append("thumbnail", courseDetails.thumbnail);

    if (courseDetails.id) formData.append("id", courseDetails.id);
    const response = courseDetails.id
      ? await dispatch(updateCourse(formData))
      : await dispatch(createCourse(formData));
    if (response?.payload?.success) {
      setCourseDetails(initialCourseState);
      navigate(AllRoutes.CourseDescription, {
        state: { ...response?.payload?.data },
      });
    }
  }

  function setStateInCourseDetails() {
    setCourseDetails({
      ...courseDetails,
      id: state?._id,
      title: state?.title,
      description: state?.description,
      category: state?.category,
      createdBy: state?.createdBy,
      thumbnail: null,
      previewImage: state?.thumbnail?.secure_url,
    });
  }

  useEffect(() => {
    if (state?._id) {
      setStateInCourseDetails();
    }
  }, []);

  return (
    <HomeLayout>
      <div className="container-wrapper">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
          <div className="flex justify-start items-center gap-5">
            <BackButton />
            <h1 className="text-center text-base md:text-2xl font-bold">
              Create New Course
            </h1>
          </div>

          <main className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="gap-y-6 w-full">
              <div>
                <label
                  htmlFor="image_uploads"
                  className="cursor-pointer text-base md:text-lg m-auto"
                >
                  {courseDetails.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border object-cover"
                      src={courseDetails.previewImage}
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex justify-center items-center border rounded-lg">
                      <h1 className="font-bold text-center px-3">
                        Upload your course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="image_uploads"
                  name="image_uploads"
                  accept=".jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>

              <CustomInput
                label="Course title"
                placeholder="Enter course title"
                name="title"
                value={courseDetails.title}
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-col gap-1">
                <label htmlFor="role" className="font-semibold">
                  Select Instructor
                </label>
                <select
                  name="createdBy"
                  id="createdBy"
                  onChange={handleUserInput}
                  disabled={role !== UserRole.Admin}
                  value={courseDetails.createdBy}
                  className="bg-transparent px-2 py-1 border rounded-lg"
                >
                  {users.length &&
                    users.map((user) => (
                      <option
                        className="bg-gray-700 text-white"
                        key={user._id}
                        value={user._id}
                      >
                        {user.fullName}
                      </option>
                    ))}
                </select>
              </div>
              <CustomInput
                label="Course category"
                placeholder="Enter course category"
                name="category"
                value={courseDetails.category}
                onChange={handleUserInput}
              />
              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="font-semibold">
                  Course description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  required
                  placeholder="Enter course description"
                  className="bg-transparent px-2 py-1 border rounded-lg h-24 overflow-y-scroll resize-none"
                  onChange={handleUserInput}
                  value={courseDetails.description}
                />
              </div>
            </div>
          </main>
          <SubmitButton
            disabled={isSubmitButtonDisabled()}
            title={courseDetails.id ? "Update Course" : "Create Course"}
          />
        </form>
      </div>
    </HomeLayout>
  );
};
