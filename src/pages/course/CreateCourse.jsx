import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "../../components/shared/BackButton";
import { CustomInput } from "../../components/shared/CustomInput";
import { AllRoutes } from "../../constants/Routes";
import { UserRole } from "../../constants/UserRole";
import HomeLayout from "../../layouts/HomeLayout";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";
import { createCourse, updateCourse } from "../../redux/slices/CourseSlice";
import { useSelectorOptionsState } from "../../redux/slices/OptionsSlice";

export const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { role, data } = useSelectorUserState();
  const { users } = useSelectorOptionsState();
  const initialCourseState = {
    id: "",
    title: "",
    description: "",
    category: "",
    createdBy: role === UserRole.Admin ? "" : data?._id,
    thumbnail: null,
    previewImage: "",
  };

  const [courseDetails, setCourseDetails] = useState(initialCourseState);

  function handleUserInput(e) {
    const { name, value } = e.target;
    setCourseDetails({ ...courseDetails, [name]: value });
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
    console.log(courseDetails);
    if (
      !courseDetails.title ||
      !courseDetails.description ||
      !courseDetails.category ||
      !courseDetails.createdBy
    ) {
      toast.error("Please fill all the details");
      return;
    }

    if (!courseDetails.id && !courseDetails.thumbnail) {
      toast.error("Course thumbnail is mandatory");
      return;
    }

    if (courseDetails.description.length < 8) {
      toast.error("Description must be at least 8 characters");
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
      navigate(AllRoutes.Courses);
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
      <div className="container flex items-center justify-center h-[90vh] m-auto px-5 sm:px-0">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
          <div className="flex justify-start items-center gap-5">
            <BackButton route={AllRoutes.Courses} />
            <h1 className="text-center text-2xl font-bold">
              Create New Course
            </h1>
          </div>

          <main className="grid grid-cols-2 gap-x-10">
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {courseDetails.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border object-cover"
                      src={courseDetails.previewImage}
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex justify-center items-center border rounded-lg">
                      <h1 className="font-bold text-lg">
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

            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="role" className="font-semibold">
                  Select Role
                </label>
                <select
                  name="createdBy"
                  id="createdBy"
                  onChange={handleUserInput}
                  disabled={role !== UserRole.Admin}
                  value={courseDetails.createdBy}
                  className="bg-transparent px-2 py-1 border rounded-lg w-full"
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
                <label htmlFor="description" className="font-semibold text-lg">
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
          <button
            className="bg-yellow-600 hover:bg-transparent border hover:text-yellow-600 border-yellow-600 rounded-lg py-1 mt-6 transition-all ease-in-out duration-300 font-semibold text-lg"
            type="submit"
          >
            {courseDetails.id ? "Update Course" : "Create Course"}
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};
