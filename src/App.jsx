import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthRedirect } from "./components/auth/AuthRedirect";
import { RequireAuth } from "./components/auth/RequireAuth";
import { Denied } from "./components/shared/Denied";
import { NotFound } from "./components/shared/NotFound";
import { AllRoutes } from "./constants/Routes";
import { UserRole } from "./constants/UserRole";
import AboutUs from "./pages/about-us/AboutUs";
import { ContactUs } from "./pages/contact-us/ContactUs";
import { CourseDescription } from "./pages/course/CourseDescription";
import { CourseList } from "./pages/course/CourseList";
import { CreateCourse } from "./pages/course/CreateCourse";
import HomePage from "./pages/home/HomePage";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/sign-up/SignUp";
import { Profile } from "./pages/user/Profile";
import { updateUserState } from "./redux/slices/AuthSlice";
import { getRole, isTokenValid } from "./utils/AuthService";

function App() {
  const dispatch = useDispatch();
  function setUserStates() {
    const userState = {
      isLoggedIn: isTokenValid(),
      role: getRole(),
    };
    dispatch(updateUserState(userState));
  }

  useEffect(() => {
    setUserStates();
  }, []);

  return (
    <>
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
          <Route path={AllRoutes.CreateCourse} element={<CreateCourse />} />
        </Route>

        <Route
          element={
            <RequireAuth allowedRoles={[UserRole.Admin, UserRole.User]} />
          }
        >
          <Route path={AllRoutes.UserProfile} element={<Profile />} />
        </Route>

        <Route path={AllRoutes.Denied} element={<Denied />}></Route>
        <Route path={AllRoutes.NotFound} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
