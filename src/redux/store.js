import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/AuthSlice";
import courseSliceReducer from "./slices/CourseSlice";
import lectureSliceReducer from "./slices/LectureSlice";
import razorpaySliceReducer from "./slices/RazorpaySlice";
import statsSliceReducer from "./slices/StatsSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    razorpay: razorpaySliceReducer,
    lecture: lectureSliceReducer,
    stats: statsSliceReducer,
  },
  devTools: true,
});

export default store;
