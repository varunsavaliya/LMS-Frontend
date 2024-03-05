import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";

export const RequireAuth = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  return isLoggedIn && allowedRoles.includes(role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to={AllRoutes.Denied} />
  ) : (
    <Navigate to={AllRoutes.Denied} />
  );
};
