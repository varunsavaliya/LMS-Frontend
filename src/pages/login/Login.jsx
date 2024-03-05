import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/shared/CustomButton";
import { CustomInput } from "../../components/shared/CustomInput";
import { AllRoutes } from "../../constants/Routes";
import HomeLayout from "../../layouts/HomeLayout";
import { login } from "../../redux/slices/AuthSlice";

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
          <CustomInput
            label="Email"
            name="email"
            placeholder="Enter your email"
            onChange={handleUserInput}
            value={loginData.email}
            type="email"
          />
          <CustomInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            onChange={handleUserInput}
            value={loginData.password}
            type="password"
          />
          <CustomButton title="Login" type="submit" />
          <p className="text-center">
            Don't have an account ?{" "}
            <Link
              to={AllRoutes.SignUp}
              className="link text-accent cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};
