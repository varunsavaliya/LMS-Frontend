import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/AuthSlice";
import courseSliceReducer from "./slices/CourseSlice";
import lectureSliceReducer from "./slices/LectureSlice";
import razorpaySliceReducer from "./slices/RazorpaySlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    razorpay: razorpaySliceReducer,
    lecture: lectureSliceReducer,
  },
  devTools: true,
});

export default store;
