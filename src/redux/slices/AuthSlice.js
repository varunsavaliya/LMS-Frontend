import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait! while creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message ?? error?.message);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Wait! authentication is in progress",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Log in",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message ?? error?.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async (data) => {
  try {
    const res = axiosInstance.get("user/logout");
    toast.promise(res, {
      loading: "Wait! logout is in progress",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Log out",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message ?? error?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("role", action?.payload?.user?.role);
        localStorage.setItem("isLoggedIn", true);
        state.data = action?.payload?.user;
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      });
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
