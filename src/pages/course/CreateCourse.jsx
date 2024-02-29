import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createCourse } from "../../redux/slices/CourseSlice";
import HomeLayout from "../../layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const CreateCourse = () => {
  const initialCourseState = {
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null,
    previewImage: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (
      !courseDetails.title ||
      !courseDetails.description ||
      !courseDetails.category ||
      !courseDetails.createdBy ||
      !courseDetails.thumbnail
    ) {
      toast.error("Please fill all the details");
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
    formData.append("thumbnail", courseDetails.thumbnail);

    const response = await dispatch(createCourse(formData));
    if (response.payload.success) {
      setCourseDetails(initialCourseState);
      navigate("/courses");
    }
  }
  return (
    <HomeLayout>
      <div className="container flex items-center justify-center h-[90vh] m-auto px-5 sm:px-0">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link className="absolute top-6 text-2xl link text-accent cursor-pointer">
            <AiOutlineArrowLeft />
          </Link>
          <h1 className="text-center text-2xl font-bold">Create New Course</h1>

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

              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="font-semibold text-lg">
                  Course title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  placeholder="Enter course title"
                  className="bg-transparent px-2 py-1 border rounded-lg"
                  onChange={handleUserInput}
                  value={courseDetails.title}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className="font-semibold text-lg">
                  Course instructor
                </label>
                <input
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  required
                  placeholder="Enter course instructor"
                  className="bg-transparent px-2 py-1 border rounded-lg"
                  onChange={handleUserInput}
                  value={courseDetails.createdBy}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="font-semibold text-lg">
                  Course category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  required
                  placeholder="Enter course category"
                  className="bg-transparent px-2 py-1 border rounded-lg"
                  onChange={handleUserInput}
                  value={courseDetails.category}
                />
              </div>
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
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};
