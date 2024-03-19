import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { EndPoints } from "../../constants/EndPoints";
import axiosInstance from "../../helpers/axiosInstance";
import { showToaster } from "../../utils/ToasterService";

const initialState = {
  users: [],
};

export const getAllUsers = createAsyncThunk("/user/all-users", async () => {
  try {
    const response = axiosInstance.get(EndPoints.Options.Users);
    return (await response).data;
  } catch (error) {
    showToaster("error", error?.response?.data?.message ?? error.message);
  }
});

const OptionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      if (action.payload?.success) {
        state.users = action.payload?.data;
      }
    });
  },
});

export const useSelectorOptionsState = () => {
  const optionsState = useSelector((state) => state?.options);
  return optionsState;
};

export default OptionsSlice.reducer;
