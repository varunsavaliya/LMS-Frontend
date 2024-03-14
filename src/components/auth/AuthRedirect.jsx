import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";

// this is used for redirect from login and sign up when user logged in
export const AuthRedirect = () => {
  const { isLoggedIn } = useSelectorUserState();
  return isLoggedIn ? <Navigate to={AllRoutes.Home} /> : <Outlet />;
};
