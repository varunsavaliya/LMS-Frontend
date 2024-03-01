import { AiFillCloseCircle } from "react-icons/ai";
import { AllRoutes } from "../constants/Routes";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserRole } from "../constants/UserRole";
import Footer from "../components/shared/Footer";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for checking if user is logged in
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  // for displaying the options acc to role
  const role = useSelector((state) => state?.auth?.role);

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
            <li>
              <Link to={AllRoutes.Home}>Home</Link>
            </li>

            {isLoggedIn && role === UserRole.Admin && (
              <>
                <li>
                  <Link to="/admin/dashboard"> Admin DashBoard</Link>
                </li>
                <li>
                  <Link to={AllRoutes.CreateCourse}> Create new course</Link>
                </li>
              </>
            )}

            <li>
              <Link to={AllRoutes.Courses}>All Courses</Link>
            </li>

            <li>
              <Link to={AllRoutes.Contact}>Contact Us</Link>
            </li>

            <li>
              <Link to={AllRoutes.About}>About Us</Link>
            </li>

            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center hover:bg-transparent">
                  <button className="btn-primary border border-yellow-500 text-yellow-500 px-4 py-1 font-semibold rounded-md w-full whitespace-nowrap">
                    <Link to={AllRoutes.Login}>Login</Link>
                  </button>
                  <button className="btn-secondary bg-white text-black px-4 py-1 font-semibold rounded-md w-full whitespace-nowrap">
                    <Link to={AllRoutes.SignUp}>Sign Up</Link>
                  </button>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center hover:bg-transparent">
                  <button className="btn-primary border border-yellow-500 text-yellow-500 px-4 py-1 font-semibold rounded-md w-full whitespace-nowrap">
                    <Link to={AllRoutes.UserProfile}>Profile</Link>
                  </button>
                  <button className="btn-secondary bg-white text-black px-4 py-1 font-semibold rounded-md w-full whitespace-nowrap">
                    <Link onClick={handleLogout}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {children}
      
      <Footer />
    </div>
  );
}

export default HomeLayout;
