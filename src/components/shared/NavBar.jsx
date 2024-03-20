import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { NavItems } from "../../constants/NavItems";
import { AllRoutes } from "../../constants/Routes";
import { logout, useSelectorUserState } from "../../redux/slices/AuthSlice";
import { NavListItem } from "./NavListItem";
import { BsPersonCircle } from "react-icons/bs";
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
          <li>
            <Link
              to={AllRoutes.UserProfile}
              className="justify-between text-base"
            >
              Profile
              <span className="badge-primary px-2 rounded-full text-sm">
                New
              </span>
            </Link>
          </li>
          <li>
            <span
              onClick={handleLogout}
              to={AllRoutes.UserProfile}
              className="justify-between"
            >
              Logout
            </span>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to={AllRoutes.Login} className="justify-between">
              Login
            </Link>
          </li>
          <li>
            <Link to={AllRoutes.SignUp} className="justify-between">
              Sign Up
            </Link>
          </li>
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
      <div className="">
        <Link to={AllRoutes.Home} className="btn btn-ghost text-xl">
          LMS
        </Link>
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
            className="hover:bg-gray-700 p-1 rounded"
          >
            <div className="flex justify-center items-center gap-2">
              {data?.avatar?.secure_url ? (
                <img alt="profile image" className="w-10 rounded-full border" src={data?.avatar?.secure_url} />
              ) : (
                <BsPersonCircle className="w-10 h-full m-auto rounded-full border border-black" />
              )}
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
