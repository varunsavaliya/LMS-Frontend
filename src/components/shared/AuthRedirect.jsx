import { AllRoutes } from "../../constants/Routes";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

// this is used for redirect from login and sign up when user logged in
export const AuthRedirect = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? <Navigate to={AllRoutes.Home} /> : <Outlet />;
};
