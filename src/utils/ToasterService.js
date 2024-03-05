import { toast } from "react-hot-toast";

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
    case "success":
      toast.success(message);
      break;

    case "error":
      toast.error(message);
      break;

    case "loading":
      toast.loading(message);
      break;

    default:
      break;
  }
}
