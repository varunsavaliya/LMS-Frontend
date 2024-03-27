import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { EndPoints } from "../../constants/EndPoints";
import { ToasterType } from "../../constants/ToasterType";
import axiosInstance from "../../helpers/axiosInstance";
import { showToaster } from "../../utils/ToasterService";

const initialState = {
  allUsersCount: 0,
  subscribedCount: 0,
};

export const getStatsData = createAsyncThunk("stats/get", async () => {
  try {
    const res = axiosInstance.get(EndPoints.Stats.getStats);
    return (await res).data;
  } catch (error) {
    showToaster(
      ToasterType.Error,
      error?.response?.data?.message ?? error.message
    );
  }
});

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatsData.fulfilled, (state, action) => {
      state.allUsersCount = action?.payload?.data?.allUsersCount;
      state.subscribedCount = action?.payload?.data?.subscribedCount;
    });
  },
});

export const useSelectorStatsState = () => {
  const statsState = useSelector((state) => state?.stats);
  return statsState;
};

export default statsSlice.reducer;
