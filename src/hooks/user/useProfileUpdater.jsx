import { useDispatch } from "react-redux";
import { Messages } from "../../constants/Messages";
import { ToasterType } from "../../constants/ToasterType";
import { editProfile, getLoggedInUser } from "../../redux/slices/AuthSlice";
import { showToaster } from "../../utils/ToasterService";

export const useProfileUpdater = () => {
  const dispatch = useDispatch();
  async function updateProfile(editUserData) {
    if (editUserData?.fullName?.length < 5) {
      showToaster(ToasterType.Error, Messages.Validation.User.Name);
      return;
    }

    if (!editUserData.fullName && !editUserData.avatar) return;

    const formData = new FormData();
    formData.append("fullName", editUserData.fullName);
    formData.append("avatar", editUserData.avatar);
    const res = await dispatch(editProfile(formData));
    if (res?.payload?.success) {
      await dispatch(getLoggedInUser());
      return true;
    } else {
      return false;
    }
  }

  return { updateProfile };
};
