import { changePassword } from "../../redux/slices/AuthSlice";
import { CustomInput } from "../shared/CustomInput";
import { useDispatch } from "react-redux";
import { useStateHandler } from "../../hooks/shared/useStateHandler";
import { showToaster } from "../../utils/ToasterService";
import { ToasterType } from "../../constants/ToasterType";
import { Messages } from "../../constants/Messages";

export const ChangePasswordDialog = ({ changePassRef }) => {
  const initialPassState = {
    oldPassword: "",
    newPassword: "",
  };
  const [passData, handlePassInputChange, setPassData] =
    useStateHandler(initialPassState);
  const dispatch = useDispatch();
  async function onPasswordChange(e) {
    e.preventDefault();

    if (!passData.oldPassword || !passData.newPassword) {
      showToaster(
        ToasterType.Error,
        Messages.Validation.AllDetailsMandatory
      );
      return;
    }

    if (passData.newPassword.length < 8) {
      showToaster(ToasterType.Error, Messages.Validation.User.Password);
      return;
    }

    const response = await dispatch(changePassword(passData));
    if (response?.payload) {
      setPassData(initialPassState);
      changePassRef.current.close();
    }
  }
  return (
    <dialog ref={changePassRef} id="change-pass-modal" className="modal">
      <div className="modal-box rounded-md">
        <h3 className="font-bold text-lg">Change Password</h3>
        <div className="modal-action justify-start">
          <form className="w-full" method="dialog" onSubmit={onPasswordChange}>
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
              onClick={() => changePassRef.current.close()}
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
  );
};
