import { toast } from "react-hot-toast";
import { ToasterType } from "../constants/ToasterType";

export async function promiseToaster(promise, loadingMessage) {
  return toast.promise(promise, {
    loading: loadingMessage,
    success: (data) => {
      return data?.data?.message;
    },
    error: (error) => {
      return error?.response?.data?.message ?? error?.message;
    },
  });
}

export function showToaster(toaster, message) {
  switch (toaster) {
    case ToasterType.Success:
      toast.success(message);
      break;

    case ToasterType.Error:
      toast.error(message);
      break;

    case ToasterType.Loading:
      toast.loading(message);
      break;

    default:
      break;
  }
}
