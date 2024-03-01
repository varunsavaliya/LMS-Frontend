import { AllRoutes } from "../../constants/Routes";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

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
