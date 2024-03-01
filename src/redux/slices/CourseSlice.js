import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { EndPoints } from "../../constants/EndPoints";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  courses: [],
};

export const getCourses = createAsyncThunk("course/get", async () => {
  try {
    const res = axiosInstance.get(EndPoints.Course.Get.GetAllCourse);
    const toastId = toast.loading("Courses loading...");
    const data = (await res).data;

    // dismiss the toast
    toast.dismiss(toastId);

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message ?? error?.message);
  }
});

export const createCourse = createAsyncThunk("course/create", async (data) => {
  try {
    const res = axiosInstance.post(EndPoints.Course.Post.Create, data);
    toast.promise(res, {
      loading: "Wait! while creating course...",
      success: "Course created successfully",
      error: "Failed to create course",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message ?? error?.message);
  }
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

export default courseSlice.reducer;
