import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components/shared/CustomButton";
import Footer from "../components/shared/Footer";
import { NavListItem } from "../components/shared/NavListItem";
import { AllRoutes } from "../constants/Routes";
import { UserRole } from "../constants/UserRole";
import { logout, useSelectorUserState } from "../redux/slices/AuthSlice";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, role } = useSelectorUserState();

  const getButtonsAccordingly = () => {
    if (isLoggedIn) {
      return (
        <>
          <CustomButton
            route={AllRoutes.UserProfile}
            title="Profile"
            designType="primary"
          />
          <CustomButton
            clickHandler={handleLogout}
            title="Logout"
            designType="secondary"
          />
        </>
      );
    } else {
      return (
        <>
          <CustomButton
            route={AllRoutes.Login}
            title="Login"
            designType="primary"
          />
          <CustomButton
            route={AllRoutes.SignUp}
            title="Sign Up"
            designType="secondary"
          />
        </>
      );
    }
  };

  function getAdminNavigation() {
    if (isLoggedIn && role === UserRole.Admin)
      return (
        <>
          <NavListItem title="Admin DashBoard" route="/admin/dashboard" />
          <NavListItem
            title="Create new course"
            route={AllRoutes.CreateCourse}
          />
        </>
      );
  }

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";
  }

  async function handleLogout(e) {
    e.preventDefault();

    const res = await dispatch(logout());
    if (res?.payload?.success) navigate(AllRoutes.Home);
  }

  return (
    <div className="min-h-[90vh]">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <NavListItem title="Home" route={AllRoutes.Home} />
            {getAdminNavigation()}
            <NavListItem title="All Courses" route={AllRoutes.Courses} />
            <NavListItem title="Contact Us" route={AllRoutes.Contact} />
            <NavListItem title="About Us" route={AllRoutes.About} />

            <li className="absolute bottom-4 w-[90%]">
              <div className="w-full flex items-center justify-center hover:bg-transparent">
                {getButtonsAccordingly()}
              </div>
            </li>
          </ul>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
}

export default HomeLayout;
