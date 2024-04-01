import "./App.css";
import { AddLecture } from "./pages/dashboard/AddLecture";
import { AdminDashboard } from "./pages/dashboard/AdminDashboard";
import { AllRoutes } from "./constants/Routes";
import { AuthRedirect } from "./components/auth/AuthRedirect";
import { Checkout } from "./pages/payment/Checkout";
import { CheckoutSuccess } from "./pages/payment/CheckoutSuccess";
import { ContactUs } from "./pages/contact-us/ContactUs";
import { CourseDescription } from "./pages/course/CourseDescription";
import { CourseLectures } from "./pages/course/CourseLectures";
import { CourseList } from "./pages/course/CourseList";
import { CreateCourse } from "./pages/course/CreateCourse";
import { Denied } from "./components/shared/Denied";
import { getAllUsers } from "./redux/slices/OptionsSlice";
import { getLoggedInUser, updateUserState } from "./redux/slices/AuthSlice";
import { getRole, isTokenValid } from "./utils/AuthService";
import { Login } from "./pages/login/Login";
import { NotFound } from "./components/shared/NotFound";
import { Profile } from "./pages/user/Profile";
import { RequireAuth } from "./components/auth/RequireAuth";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/sign-up/SignUp";
import { TutorDashboard } from "./pages/dashboard/TutorDashboard";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { UserRole } from "./constants/UserRole";
import AboutUs from "./pages/about-us/AboutUs";
import HomePage from "./pages/home/HomePage";

function App() {
  const [isUserStateSet, setUserStateSet] = useState(false);
  const dispatch = useDispatch();
  async function setUserStates() {
    const userState = {
      isLoggedIn: isTokenValid(),
      role: getRole(),
    };
    if (!userState.isLoggedIn) userState.role = "";
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
          <Route exact path={AllRoutes.Home} element={<HomePage />}></Route>
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
          <Route element={<RequireAuth allowedRoles={[UserRole.Tutor]} />}>
            <Route path={AllRoutes.TutorCourses} element={<TutorDashboard />} />
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
