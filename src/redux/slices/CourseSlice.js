import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EndPoints } from "../../constants/EndPoints";
import { Messages } from "../../constants/Messages";
import { promiseToaster } from "../../utils/ToasterService";
import axiosInstance from "../../helpers/axiosInstance";
import { useSelector } from "react-redux";

const initialState = {
  courses: [],
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

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courses = [...action.payload.data];
      }
    });
  },
});

export const useSelectorCourseState = () => {
  const courseState = useSelector((state) => state?.course);
  return courseState;
};

export default courseSlice.reducer;
