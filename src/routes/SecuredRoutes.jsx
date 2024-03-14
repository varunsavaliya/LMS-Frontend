import { AllRoutes } from "../constants/Routes";
import { AuthRedirect } from "../components/auth/AuthRedirect";
import { Checkout } from "../pages/payment/Checkout";
import { CheckoutFailure } from "../pages/payment/CheckoutFailure";
import { CheckoutSuccess } from "../pages/payment/CheckoutSuccess";
import { CreateCourse } from "../pages/course/CreateCourse";
import { Login } from "../pages/login/Login";
import { Profile } from "../pages/user/Profile";
import { RequireAuth } from "../components/auth/RequireAuth";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "../pages/sign-up/SignUp";
import { UserRole } from "../constants/UserRole";
import { useSelectorUserState } from "../redux/slices/AuthSlice";
import React from "react";
import { CourseLectures } from "../pages/course/CourseLectures";

export const SecuredRoutes = () => {
  const { isLoggedIn } = useSelectorUserState();
  return (
    <Routes>
      <Route element={<AuthRedirect />}>
        <Route path={AllRoutes.SignUp} element={<SignUp />} />
        <Route path={AllRoutes.Login} element={<Login />} />
      </Route>
      {isLoggedIn && (
        <>
          <Route element={<RequireAuth allowedRoles={[UserRole.Admin]} />}>
            <Route path={AllRoutes.CreateCourse} element={<CreateCourse />} />
          </Route>

          <Route
            element={
              <RequireAuth allowedRoles={[UserRole.Admin, UserRole.User]} />
            }
          >
            <Route path={AllRoutes.UserProfile} element={<Profile />} />
            <Route path={AllRoutes.Checkout} element={<Checkout />}></Route>
            <Route
              path={AllRoutes.CheckoutSuccess}
              element={<CheckoutSuccess />}
            ></Route>
            <Route
              path={AllRoutes.CheckoutFail}
              element={<CheckoutFailure />}
            ></Route>
            <Route
              path={AllRoutes.CourseLectures}
              element={<CourseLectures />}
            />
          </Route>
        </>
      )}
    </Routes>
  );
};
