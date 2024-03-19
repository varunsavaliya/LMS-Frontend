import "./App.css";
import { AllRoutes } from "./constants/Routes";
import { Denied } from "./components/shared/Denied";
import { getRole, isTokenValid } from "./utils/AuthService";
import { NormalRoutes } from "./routes/NormalRoutes";
import { NotFound } from "./components/shared/NotFound";
import { Route, Routes } from "react-router-dom";
import { SecuredRoutes } from "./routes/SecuredRoutes";
import { getLoggedInUser, updateUserState } from "./redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import HomePage from "./pages/home/HomePage";
import AboutUs from "./pages/about-us/AboutUs";
import { ContactUs } from "./pages/contact-us/ContactUs";
import { CourseList } from "./pages/course/CourseList";
import { CourseDescription } from "./pages/course/CourseDescription";
import { SignUp } from "./pages/sign-up/SignUp";
import { Login } from "./pages/login/Login";
import { AuthRedirect } from "./components/auth/AuthRedirect";
import { RequireAuth } from "./components/auth/RequireAuth";
import { CreateCourse } from "./pages/course/CreateCourse";
import { Profile } from "./pages/user/Profile";
import { Checkout } from "./pages/payment/Checkout";
import { CheckoutSuccess } from "./pages/payment/CheckoutSuccess";
import { CheckoutFailure } from "./pages/payment/CheckoutFailure";
import { CourseLectures } from "./pages/course/CourseLectures";
import { UserRole } from "./constants/UserRole";
import { AddLecture } from "./pages/dashboard/AddLecture";
import { AdminDashboard } from "./pages/dashboard/AdminDashboard";
import { getAllUsers } from "./redux/slices/OptionsSlice";

function App() {
  const [isUserStateSet, setUserStateSet] = useState(false);
  const dispatch = useDispatch();
  async function setUserStates() {
    const userState = {
      isLoggedIn: isTokenValid(),
      role: getRole(),
    };
    dispatch(updateUserState(userState));
    userState.isLoggedIn && (await dispatch(getLoggedInUser()));
    await dispatch(getAllUsers());
    setUserStateSet(true);
  }

  useEffect(() => {
    setUserStates();
  }, []);

  return (
    <>
      {isUserStateSet && (
        <Routes>
          <Route path={AllRoutes.Home} element={<HomePage />}></Route>
          <Route path={AllRoutes.About} element={<AboutUs />}></Route>
          <Route path={AllRoutes.Contact} element={<ContactUs />}></Route>
          <Route path={AllRoutes.Courses} element={<CourseList />}></Route>
          <Route
            path={AllRoutes.CourseDescription}
            element={<CourseDescription />}
          ></Route>

          <Route element={<AuthRedirect />}>
            <Route path={AllRoutes.SignUp} element={<SignUp />} />
            <Route path={AllRoutes.Login} element={<Login />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[UserRole.Admin]} />}>
            <Route
              path={AllRoutes.AdminDashboard}
              element={<AdminDashboard />}
            />
          </Route>
          <Route
            element={
              <RequireAuth allowedRoles={[UserRole.Admin, UserRole.Tutor]} />
            }
          >
            <Route path={AllRoutes.CreateCourse} element={<CreateCourse />} />
            <Route path={AllRoutes.AddLecture} element={<AddLecture />} />
          </Route>

          <Route
            element={
              <RequireAuth
                allowedRoles={[UserRole.Admin, UserRole.User, UserRole.Tutor]}
              />
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

          <Route path={AllRoutes.Denied} element={<Denied />}></Route>
          <Route path={AllRoutes.NotFound} element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
