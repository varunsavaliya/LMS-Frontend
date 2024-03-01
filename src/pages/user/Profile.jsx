import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";

export const Profile = () => {
  const userData = useSelector((state) => state.auth?.data);
  return (
    <HomeLayout>
      <div className="container pt-10 md:px-5 px-9 text-white flex items-center justify-center gap-10 m-auto h-[90vh]">
        <div className="my-10 flex flex-col gap-4 text-white w-80 shadow-[0_0_10px_black]">
          {userData?.avatar?.secure_url ? (
            <img
              src={userData.avatar.secure_url}
              className="w-40 m-auto rounded-full border border-black"
              alt="profile image"
            />
          ) : (
            <BsPersonCircle className="w-40 m-auto rounded-full border border-black" />
          )}
        </div>
      </div>
    </HomeLayout>
  );
};
