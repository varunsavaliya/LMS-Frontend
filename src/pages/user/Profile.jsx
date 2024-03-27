import { BsPersonCircle } from "react-icons/bs";
import { cancelCourseBundle } from "../../redux/slices/RazorpaySlice";
import { ChangePasswordDialog } from "../../components/user/ChangePasswordDialog";
import { EditProfileDialog } from "../../components/user/EditProfileDialog";
import { FileExtensions } from "../../constants/FileExtensions";
import { Messages } from "../../constants/Messages";
import { showToaster } from "../../utils/ToasterService";
import { SubscriptionStatus } from "../../constants/SubscriptionStatus";
import { ToasterType } from "../../constants/ToasterType";
import { useDispatch } from "react-redux";
import { useProfileUpdater } from "../../hooks/user/useProfileUpdater";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";
import { useStateHandler } from "../../hooks/shared/useStateHandler";
import HomeLayout from "../../layouts/HomeLayout";
import React, { useEffect, useRef } from "react";

export const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelectorUserState()?.data;
  const change_pass = useRef();
  const edit_profile = useRef();
  const { updateProfile } = useProfileUpdater();

  const initialEditUserState = {
    fullName: userData?.fullName,
    avatar: "",
    previewImage: userData?.avatar?.secure_url ?? "",
  };

  const [editUserData, handleProfileInputChange, setEditUserData] =
    useStateHandler(initialEditUserState);

  async function editProfile(e) {
    e && e.preventDefault();
    const isProfileUpdated = updateProfile(editUserData);
    if (isProfileUpdated) edit_profile.current.close();
    else
      setEditUserData((state) => ({
        ...state,
        previewImage: userData?.avatar?.secure_url,
      }));
  }

  function getImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    const fileName = uploadedImage.name;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    if (!FileExtensions.Profile.includes(fileExtension)) {
      showToaster(ToasterType.Error, Messages.Error.File);
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
        setEditUserData((state) => ({
          ...state,
          previewImage: fileReader.result,
        }));
      };
      e.target.value = "";
    }
  }

  useEffect(() => {
    if (editUserData.avatar) {
      editProfile();
    }
  }, [editUserData.avatar]);

  async function handleCancellation() {
    await dispatch(cancelCourseBundle());
  }

  return (
    <HomeLayout>
      <div className="container-wrapper text-white">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <label
            htmlFor="image_uploads"
            className="cursor-pointer w-max m-auto"
          >
            {editUserData.previewImage ? (
              <img
                src={editUserData.previewImage ?? userData?.avatar?.secure_url}
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
            <p
              className={
                userData?.subscription?.status === SubscriptionStatus.Active
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {userData?.subscription?.status === SubscriptionStatus.Active
                ? SubscriptionStatus.Active.toUpperCase()
                : SubscriptionStatus.InActive.toUpperCase()}
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
          {userData?.subscription?.status === SubscriptionStatus.Active && (
            <button
              onClick={handleCancellation}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      <ChangePasswordDialog changePassRef={change_pass} />
      <EditProfileDialog
        editUserData={editUserData}
        profileDialogRef={edit_profile}
        updateProfile={editProfile}
        handleProfileInputChange={handleProfileInputChange}
      />
    </HomeLayout>
  );
};
