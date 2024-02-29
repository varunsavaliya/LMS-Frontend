import "./App.css";
import { ContactUs } from "./pages/contact-us/ContactUs";
import { CourseList } from "./pages/course/CourseList";
import { Login } from "./pages/login/Login";
import { NotFound } from "./components/shared/NotFound";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/sign-up/SignUp";
import AboutUs from "./pages/about-us/AboutUs";
import HomePage from "./pages/home/HomePage";
import { Denied } from "./components/shared/Denied";
import { CourseDescription } from "./pages/course/CourseDescription";
import { RequireAuth } from "./components/shared/RequireAuth";
import { CreateCourse } from "./pages/course/CreateCourse";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="/denied" element={<Denied />}></Route>
        <Route
          path="/course/description"
          element={<CourseDescription />}
        ></Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
