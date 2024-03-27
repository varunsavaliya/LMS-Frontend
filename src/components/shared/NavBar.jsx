import { AllRoutes } from "../../constants/Routes";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logout, useSelectorUserState } from "../../redux/slices/AuthSlice";
import { NavItems } from "../../constants/NavItems";
import { NavListItem } from "./NavListItem";
import { ProfileListItem } from "./ProfileListItem";
import { useDispatch } from "react-redux";
import { UserRole } from "../../constants/UserRole";

export const NavBar = () => {
  const { isLoggedIn, role, data } = useSelectorUserState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navItems = NavItems.filter((item) =>
    item.allowedRoles.includes(role ? role : UserRole.User)
  );
  function getButtonsAccordingToLoginStatus() {
    if (isLoggedIn) {
      return (
        <>
          <li className="text-gray-400 text-sm">
            <span className="flex flex-col justify-center items-start">
              <span> Logged in as</span>
              <div> {data?.email}</div>
            </span>
          </li>
          <div className="divider my-0"></div>
          <ProfileListItem
            badgeTitle="New"
            route={AllRoutes.UserProfile}
            title="Profile"
          />
          <ProfileListItem handler={handleLogout} title="Logout" />
        </>
      );
    } else {
      return (
        <>
          <ProfileListItem route={AllRoutes.Login} title="Login" />
          <ProfileListItem route={AllRoutes.SignUp} title="Sign Up" />
        </>
      );
    }
  }

  async function handleLogout(e) {
    e.preventDefault();

    const res = await dispatch(logout());
    if (res?.payload?.success) navigate(AllRoutes.Home);
  }

  return (
    <div className="navbar text-white flex justify-between items-center h-[7vh] px-5 bg-gray-800">
      <div className="flex flex-col gap-0 justify-center items-start">
        <Link to={AllRoutes.Home} className="p-0 m-0 font-semibold text-lg">
          LMS
        </Link>
        <span className="text-xs">Learning Management System</span>
      </div>
      <ul className="z-[1] p-2">
        {navItems.map((item) => (
          <NavListItem key={item.title} title={item.title} route={item.route} />
        ))}
      </ul>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="hover:bg-base-200 px-2 py-1 rounded"
          >
            <div className="flex justify-center items-center gap-2">
              <div className="avatar">
                <div className="w-10 mask mask-squircle">
                  {data?.avatar?.secure_url ? (
                    <img alt="profile image" src={data?.avatar?.secure_url} />
                  ) : (
                    <BsPersonCircle className="w-10 h-full" />
                  )}
                </div>
              </div>
              <div className="whitespace-nowrap">{data?.fullName}</div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-800 rounded-box w-52"
          >
            {getButtonsAccordingToLoginStatus()}
          </ul>
        </div>
      </div>
    </div>
  );
};
