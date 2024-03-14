import { AllRoutes } from "../constants/Routes";
import { ContactUs } from "../pages/contact-us/ContactUs";
import { CourseDescription } from "../pages/course/CourseDescription";
import { CourseList } from "../pages/course/CourseList";
import { Route, Routes } from "react-router-dom";
import AboutUs from "../pages/about-us/AboutUs";
import HomePage from "../pages/home/HomePage";
import React from "react";

export const NormalRoutes = () => {
  return (
    <Routes>
      <Route path={AllRoutes.Home} element={<HomePage />}></Route>
      <Route path={AllRoutes.About} element={<AboutUs />}></Route>
      <Route path={AllRoutes.Contact} element={<ContactUs />}></Route>
      <Route path={AllRoutes.Courses} element={<CourseList />}></Route>
      <Route
        path={AllRoutes.CourseDescription}
        element={<CourseDescription />}
      ></Route>
    </Routes>
  );
};
