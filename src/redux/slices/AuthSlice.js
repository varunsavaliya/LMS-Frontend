import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EndPoints } from "../../constants/EndPoints";
import { Messages } from "../../constants/Messages";
import { promiseToaster } from "../../utils/ToasterService";
import { useSelector } from "react-redux";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  isLoggedIn: false,
  role: "",
  data: {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  const res = promiseToaster(
    axiosInstance.post(EndPoints.Auth.Post.Register, data),
    Messages.Loading.Auth.CreateAccount
  );

  return (await res).data;
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  const res = promiseToaster(
    axiosInstance.post(EndPoints.Auth.Post.Login, data),
    Messages.Loading.Auth.Login
  );

  return (await res).data;
});

export const logout = createAsyncThunk("/auth/logout", async (data) => {
  const res = promiseToaster(
    axiosInstance.get(EndPoints.Auth.Get.Logout),
    Messages.Loading.Auth.Logout
  );

  return (await res).data;
});

export const getLoggedInUser = createAsyncThunk("auth/profile", async () => {
  const res = promiseToaster(
    axiosInstance.get(EndPoints.Auth.Get.Profile),
    Messages.Loading.Auth.LoggedInUser
  );

  return (await res).data;
});

export const changePassword = createAsyncThunk(
  "/auth/changepassword",
  async (data) => {
    const res = promiseToaster(
      axiosInstance.post(EndPoints.Auth.Post.ChangePassword, data),
      Messages.Loading.Auth.ChangePassword
    );

    return (await res).data;
  }
);

export const editProfile = createAsyncThunk(
  "/auth/editprofile",
  async (data) => {
    const res = promiseToaster(
      axiosInstance.post(EndPoints.Auth.Post.EditProfile, data),
      Messages.Loading.Auth.EditProfile
    );

    return (await res).data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserState: (state, action) => {
      state.isLoggedIn = action?.payload?.isLoggedIn;
      state.role = action?.payload?.role;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoggedIn = action?.payload?.success;
        state.role = action?.payload?.user?.role;
        state.data = action?.payload?.user;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action?.payload?.success;
        state.role = action?.payload?.user?.role;
        state.data = action?.payload?.user;
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.data = action?.payload?.data;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
      });
  },
});

export const { updateUserState } = authSlice.actions;
export const useSelectorUserState = () => {
  const userState = useSelector((state) => state?.auth);
  return userState;
};

export default authSlice.reducer;
