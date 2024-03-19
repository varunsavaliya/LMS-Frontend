import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { CourseStatus } from "../../constants/CourseStatus";
import { EndPoints } from "../../constants/EndPoints";
import { Messages } from "../../constants/Messages";
import axiosInstance from "../../helpers/axiosInstance";
import { promiseToaster } from "../../utils/ToasterService";

const initialState = {
  allCourses: [],
  activeCourses: [],
  userCourses: [],
};

export const getCourses = createAsyncThunk("course/get", async () => {
  const res = promiseToaster(
    axiosInstance.get(EndPoints.Course.Get.GetAllCourse),
    Messages.Loading.Course.Courses
  );
  return (await res).data;
});

export const createCourse = createAsyncThunk("course/create", async (data) => {
  const res = promiseToaster(
    axiosInstance.post(EndPoints.Course.Post.Create, data),
    Messages.Loading.Course.CreateCourse
  );
  return (await res).data;
});

export const updateCourse = createAsyncThunk("course/create", async (data) => {
  const res = promiseToaster(
    axiosInstance.put(
      `${EndPoints.Course.Post.Update}/${data.get("id")}`,
      data
    ),
    Messages.Loading.Course.UpdateCourse
  );
  return (await res).data;
});

export const deleteCourse = createAsyncThunk("course/delete", async (data) => {
  const res = promiseToaster(
    axiosInstance.delete(
      `${EndPoints.Course.Delete.DeleteCourse}/${data}`,
      data
    ),
    Messages.Loading.Course.DeleteCourse
  );
  return (await res).data;
});

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourses.fulfilled, (state, action) => {
      if (action.payload?.success) {
        state.allCourses = action.payload?.data;
        state.activeCourses = action.payload?.data?.filter(
          (course) => course.status === CourseStatus.Approved
        );
      }
    });
  },
});

export const useSelectorCourseState = () => {
  const courseState = useSelector((state) => state?.course);
  return courseState;
};

export default courseSlice.reducer;
