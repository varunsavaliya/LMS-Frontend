import { CustomInput } from "../shared/CustomInput";

export const EditProfileDialog = ({
  profileDialogRef,
  updateProfile,
  handleProfileInputChange,
  editUserData,
}) => {
  return (
    <dialog ref={profileDialogRef} id="edit-profile-modal" className="modal">
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
              onClick={() => profileDialogRef.current.close()}
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
  );
};
