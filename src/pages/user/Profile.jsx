import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { CustomInput } from "../../components/shared/CustomInput";
import HomeLayout from "../../layouts/HomeLayout";
import {
  changePassword,
  editProfile,
  getLoggedInUser,
  useSelectorUserState,
} from "../../redux/slices/AuthSlice";
import { cancelCourseBundle } from "../../redux/slices/RazorpaySlice";
import { FileExtensions } from "../../constants/FileExtensions";
import { showToaster } from "../../utils/ToasterService";

export const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelectorUserState()?.data;
  const [passData, setPassData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [previewImage, setPreviewImage] = useState(
    userData?.avatar?.secure_url
  );
  const [editUserData, setEditUserData] = useState({
    fullName: userData?.fullName,
    avatar: "",
  });
  const change_pass = useRef();
  const edit_profile = useRef();

  async function onPasswordChange(e) {
    e.preventDefault();

    if (!passData.oldPassword || !passData.newPassword) {
      toast.error("Fill all the details");
      return;
    }

    if (passData.newPassword.length < 8) {
      toast.error("Password should be at least 8 characters");
      return;
    }

    const response = await dispatch(changePassword(passData));
    if (response?.payload) {
      change_pass.current.close();
    }
  }

  async function updateProfile(e) {
    e && e.preventDefault();

    if (editUserData?.fullName?.length < 5) {
      showToaster("error", "Name should be at least 5 characters");
      return;
    }

    if (!editUserData.fullName && !editUserData.avatar) return;

    const formData = new FormData();
    formData.append("fullName", editUserData.fullName);
    formData.append("avatar", editUserData.avatar);
    const res = await dispatch(editProfile(formData));
    if (res?.payload?.success) {
      edit_profile.current.close();
      await dispatch(getLoggedInUser());
    } else {
      setPreviewImage(userData?.avatar?.secure_url);
    }
  }

  function getImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    const fileName = uploadedImage.name;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    if (!FileExtensions.Profile.includes(fileExtension)) {
      showToaster("error", "Invalid file format");
      return;
    }
    if (uploadedImage) {
      setEditUserData({
        ...editUserData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onload = function () {
        setPreviewImage(fileReader.result);
      };
      e.target.value = "";
    }
  }

  function handlePassInputChange(e) {
    const { name, value } = e.target;
    setPassData({ ...passData, [name]: value });
  }

  function handleProfileInputChange(e) {
    const { name, value } = e.target;
    setEditUserData({ ...editUserData, [name]: value });
  }

  useEffect(() => {
    if (editUserData.avatar) {
      updateProfile();
    }
  }, [editUserData.avatar]);

  async function handleCancellation() {
    await dispatch(cancelCourseBundle());
  }

  return (
    <HomeLayout>
      <div className="container-wrapper text-white flex items-center justify-center gap-10">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <label
            htmlFor="image_uploads"
            className="cursor-pointer w-max m-auto"
          >
            {previewImage || userData?.avatar?.secure_url ? (
              <img
                src={previewImage ?? userData?.avatar?.secure_url}
                className="w-40 h-40 m-auto rounded-full border border-black object-cover"
              />
            ) : (
              <BsPersonCircle className="w-40 h-40 m-auto rounded-full border border-black" />
            )}
          </label>
          <input
            onChange={getImage}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png"
          />
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>
          <div className="grid grid-cols-2">
            <p>Email: </p>
            <p>{userData?.email}</p>
            <p>Role: </p>
            <p>{userData?.role}</p>
            <p>Subscription: </p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 overflow-hidden">
            <span
              className="text-white btn w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
              onClick={() => change_pass.current.showModal()}
            >
              <button>Change password</button>
            </span>
            <span
              onClick={() => edit_profile.current.showModal()}
              className="text-white btn w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              <button>Edit profile</button>
            </span>
          </div>
          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancellation}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      <dialog ref={change_pass} id="change-pass-modal" className="modal">
        <div className="modal-box rounded-md">
          <h3 className="font-bold text-lg">Change Password</h3>
          <div className="modal-action justify-start">
            <form
              className="w-full"
              method="dialog"
              onSubmit={onPasswordChange}
            >
              <CustomInput
                label="Old password"
                placeholder="Enter your old password"
                name="oldPassword"
                type="password"
                value={passData.oldPassword}
                onChange={handlePassInputChange}
              />
              <CustomInput
                label="New password"
                placeholder="Enter your new password"
                name="newPassword"
                type="password"
                value={passData.newPassword}
                onChange={handlePassInputChange}
              />
              <button
                onClick={() => change_pass.current.close()}
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <div className="w-full flex justify-end pt-5">
                <button type="submit" className="btn">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <dialog ref={edit_profile} id="edit-profile-modal" className="modal">
        <div className="modal-box rounded-md">
          <h3 className="font-bold text-lg">Edit Profile</h3>
          <div className="modal-action justify-start">
            <form className="w-full" method="dialog" onSubmit={updateProfile}>
              <CustomInput
                label="Name"
                placeholder="Enter your name"
                name="fullName"
                value={editUserData?.fullName}
                onChange={handleProfileInputChange}
              />
              <button
                onClick={() => edit_profile.current.close()}
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <div className="w-full flex justify-end pt-5">
                <button type="submit" className="btn">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </HomeLayout>
  );
};
