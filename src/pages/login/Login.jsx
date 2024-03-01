import { AllRoutes } from "../../constants/Routes";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/AuthSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import React, { useState } from "react";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }

  async function onLogin(e) {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    const res = await dispatch(login(loginData));
    if (res && res.payload?.success) {
      setLoginData({
        email: "",
        password: "",
      });
      navigate(AllRoutes.Home);
    }
  }

  return (
    <HomeLayout>
      <div className="container flex items-center justify-center h-[90vh] m-auto px-5 sm:px-0">
        <form
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] mt-9 sm:mt-0"
        >
          <h1 className="text-center text-2xl font-bold">Welcome back!!</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email"
              className="bg-transparent px-2 py-1 border rounded-lg"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password"
              className="bg-transparent px-2 py-1 border rounded-lg"
              autoComplete="true"
              onChange={handleUserInput}
              value={loginData.password}
            />
          </div>

          <button
            className="bg-yellow-600 hover:bg-transparent border hover:text-yellow-600 border-yellow-600 rounded-lg py-1 mt-6 transition-all ease-in-out duration-300 font-semibold text-lg"
            type="submit"
          >
            Login
          </button>

          <p className="text-center">
            Don't have an account ?{" "}
            <Link to={AllRoutes.SignUp} className="link text-accent cursor-pointer">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};
