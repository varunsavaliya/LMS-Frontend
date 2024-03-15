import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { promiseToaster } from "../../utils/ToasterService";
import axiosInstance from "../../helpers/axiosInstance";
import { EndPoints } from "../../constants/EndPoints";
import { useSelector } from "react-redux";

const initialState = {
  lectures: [],
};

export const getCourseLectures = createAsyncThunk(
  "/course/lecture/get",
  async (cid) => {
    const res = promiseToaster(
      axiosInstance.get(
        `${EndPoints.Lecture.Path}/${EndPoints.Lecture.Get.AllLectures}/${cid}`
      ),
      "Fetching course lectures"
    );
    return (await res).data;
  }
);

export const addCourseLectures = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("lecture", data.lecture);
    formData.append("description", data.description);

    const res = promiseToaster(
      axiosInstance.post(
        `${EndPoints.Lecture.Path}/${EndPoints.Lecture.Get.AllLectures}/${data.id}`,
        formData
      ),
      "Adding course lecture"
    );
    return (await res).data;
  }
);

export const updateCourseLectures = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.lecture) formData.append("lecture", data.lecture);
    formData.append("description", data.description);

    const res = promiseToaster(
      axiosInstance.put(
        `${EndPoints.Lecture.Path}/${EndPoints.Lecture.Get.AllLectures}/${data.id}/${data.lectureId}`,
        formData
      ),
      "Adding course lecture"
    );
    return (await res).data;
  }
);

export const deleteCourseLectures = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    const res = promiseToaster(
      axiosInstance.delete(
        `${EndPoints.Lecture.Path}/${EndPoints.Lecture.Get.AllLectures}/${data.courseId}/${data.lectureId}`
      ),
      "Deleting course lecture"
    );
    console.log((await res).data);
    return (await res).data;
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        if (action.payload) {
          state.lectures = action.payload.data;
        }
      })
      .addCase(addCourseLectures.fulfilled, (state, action) => {
        if (action.payload) {
          state.lectures = action.payload.data.lectures;
        }
      });
  },
});

export const useSelectorLectureState = () => {
  const lectureState = useSelector((state) => state?.lecture);
  return lectureState;
};

export default lectureSlice.reducer;
