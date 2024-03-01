import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EndPoints } from "../../constants/EndPoints";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";
import Cookies from "js-cookie";

const decodeToken = () => {
  const token = Cookies.get("token");
  let finalDecodedToken = null;
  try {
    finalDecodedToken = token ? jwtDecode(token) : null;
  } catch (error) {
    finalDecodedToken = null;
  }
  return finalDecodedToken;
};

const isTokenValid = () => {
  const expiryTime = decodeToken()?.exp;
  if (expiryTime) {
    return 1000 * expiryTime > new Date().getTime();
  } else {
    return false;
  }
};

const getRole = () => {
  return decodeToken()?.role ?? "";
};

const initialState = {
  isLoggedIn: isTokenValid() || false,
  role: getRole() || "",
  data: isTokenValid() ? JSON.parse(localStorage.getItem("data")) || {} : {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post(EndPoints.Auth.Post.Register, data);
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
    const res = axiosInstance.post(EndPoints.Auth.Post.Login, data);
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
    const res = axiosInstance.get(EndPoints.Auth.Get.Logout);
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
      .addCase(createAccount.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        state.data = action?.payload?.user;
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
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
