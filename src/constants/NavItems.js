import { AllRoutes } from "./Routes";
import { UserRole } from "./UserRole";

export const NavItems = [
  {
    title: "Home",
    route: AllRoutes.Home,
    allowedRoles: Object.values(UserRole),
  },
  {
    title: "Admin Dashboard",
    route: AllRoutes.AdminDashboard,
    allowedRoles: [UserRole.Admin],
  },
  {
    title: "Create New Course",
    route: AllRoutes.CreateCourse,
    allowedRoles: [UserRole.Admin, UserRole.Tutor],
  },
  {
    title: "Your Courses",
    route: AllRoutes.TutorCourses,
    allowedRoles: [UserRole.Tutor],
  },
  {
    title: "All Courses",
    route: AllRoutes.Courses,
    allowedRoles: Object.values(UserRole),
  },
  {
    title: "Contact Us",
    route: AllRoutes.Contact,
    allowedRoles: Object.values(UserRole),
  },
  {
    title: "About Us",
    route: AllRoutes.About,
    allowedRoles: Object.values(UserRole),
  },
];
