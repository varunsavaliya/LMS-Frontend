import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/shared/CustomButton";
import { CustomInput } from "../../components/shared/CustomInput";
import { AllRoutes } from "../../constants/Routes";
import { UserRole } from "../../constants/UserRole";
import { isEmailValid } from "../../helpers/regexMatcher";
import HomeLayout from "../../layouts/HomeLayout";
import { createAccount } from "../../redux/slices/AuthSlice";

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
    role: UserRole.User,
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  }

  function getImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      setSignUpData({
        ...signUpData,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(e) {
    e.preventDefault();
    if (
      !signUpData.fullName ||
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.role
    ) {
      toast.error("Please fill all the details");
      return;
    }

    if (signUpData.fullName.length < 5) {
      toast.error("Name should be at least 5 characters");
      return;
    }

    if (!isEmailValid(signUpData.email)) {
      toast.error("Enter a valid email");
      return;
    }

    if (signUpData.password.length < 8) {
      toast.error("Password should be at least 8 characters");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signUpData.fullName);
    formData.append("email", signUpData.email);
    formData.append("password", signUpData.password);
    formData.append("avatar", signUpData.avatar);
    formData.append("role", signUpData.role);

    const res = await dispatch(createAccount(formData));
    if (res && res.payload?.success) {
      setSignUpData({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
      });
      setPreviewImage("");
      navigate(AllRoutes.Home);
    }
  }

  return (
    <HomeLayout>
      <div className="container flex items-center justify-center h-[90vh] m-auto px-5 sm:px-0">
        <form
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] mt-9 sm:mt-0"
        >
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>

          <label
            htmlFor="image_uploads"
            className="cursor-pointer w-max m-auto"
          >
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
                alt=""
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={getImage}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png,.svg"
          />
          <CustomInput
            label="Name"
            name="fullName"
            placeholder="Enter your name"
            onChange={handleUserInput}
            value={signUpData.fullName}
          />
          <CustomInput
            label="Email"
            name="email"
            placeholder="Enter your email"
            onChange={handleUserInput}
            value={signUpData.email}
            type="email"
          />
          <CustomInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            onChange={handleUserInput}
            value={signUpData.password}
            type="password"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="font-semibold">
              Select Role
            </label>

            <select
              name="role"
              id="role"
              value={signUpData.role}
              onChange={handleUserInput}
              className="bg-transparent px-2 py-1 border rounded-lg w-full"
            >
              {Object.values(UserRole).map((role) => (
                <option key={role} className="bg-gray-700 text-white" value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <CustomButton title="Create Account" type="submit" />
          <p className="text-center">
            Already have an account ?{" "}
            <Link
              to={AllRoutes.Login}
              className="link text-accent cursor-pointer"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};
