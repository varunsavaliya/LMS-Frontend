import "./App.css";
import { AllRoutes } from "./constants/Routes";
import { AuthRedirect } from "./components/shared/AuthRedirect";
import { ContactUs } from "./pages/contact-us/ContactUs";
import { CourseDescription } from "./pages/course/CourseDescription";
import { CourseList } from "./pages/course/CourseList";
import { CreateCourse } from "./pages/course/CreateCourse";
import { Denied } from "./components/shared/Denied";
import { Login } from "./pages/login/Login";
import { NotFound } from "./components/shared/NotFound";
import { Profile } from "./pages/user/Profile";
import { RequireAuth } from "./components/shared/RequireAuth";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/sign-up/SignUp";
import { UserRole } from "./constants/UserRole";
import AboutUs from "./pages/about-us/AboutUs";
import HomePage from "./pages/home/HomePage";

function App() {
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
