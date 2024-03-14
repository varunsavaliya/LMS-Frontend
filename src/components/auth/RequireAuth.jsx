import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";

export const RequireAuth = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useSelectorUserState();
  return isLoggedIn && allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to={AllRoutes.Denied} />
  );
};
