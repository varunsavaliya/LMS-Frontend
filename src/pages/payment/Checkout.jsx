import { AllRoutes } from "../../constants/Routes";
import { BiRupee } from "react-icons/bi";
import { CustomButton } from "../../components/shared/CustomButton";
import {
  getLoggedInUser,
  useSelectorUserState,
} from "../../redux/slices/AuthSlice";
import {
  getRazorpayId,
  purchaseCourseBundle,
  useSelectorRazorpayState,
  verifyUserPayment,
} from "../../redux/slices/RazorpaySlice";
import { Messages } from "../../constants/Messages";
import { showToaster } from "../../utils/ToasterService";
import { ToasterType } from "../../constants/ToasterType";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../constants/UserRole";
import HomeLayout from "../../layouts/HomeLayout";
import React, { useEffect } from "react";

export const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { key, subscription_id } = useSelectorRazorpayState();
  const user = useSelectorUserState()?.data;
  const role = useSelectorUserState()?.role;

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  async function load() {
    await dispatch(getRazorpayId());
    await dispatch(purchaseCourseBundle());
  }

  async function handleSubscription(e) {
    e.preventDefault();

    if (!key || !subscription_id) {
      showToaster(ToasterType.Error, Messages.Error.SomethingWrong);
      return;
    }

    const options = {
      key,
      subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Subscription",
      theme: {
        color: "#F37254",
      },
      prefill: {
        email: user?.email,
        name: user?.fullName,
      },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;

        showToaster(ToasterType.Success, Messages.Success.Payment);

        const res = await dispatch(verifyUserPayment(paymentDetails));
        if (res?.payload?.success) {
          await dispatch(getLoggedInUser());
          navigate(AllRoutes.CheckoutSuccess, { state: { success: true } });
        } else {
          navigate(AllRoutes.CheckoutSuccess, { state: { success: false } });
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    if (role === UserRole.Admin) navigate(AllRoutes.Courses);
    else load();
  }, []);

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="container-wrapper text-white"
      >
        <div className="w-80 h-[26rem] flex flex-col justify-start shadow-[0_0_10px_black] rounded-lg ">
          <h1 className="bg-yellow-500  top-0 w-full text-center py-4 text-2xl font-bold rounded-tr-lg">
            Subscription Bundle
          </h1>
          <div className="px-4 space-y-5 text-center my-3">
            <p className="text-[17px]">
              This purchase will allow you to access all available courses of
              our platform for{" "}
              <span className="text-yellow-500 font-bold">
                1 year duration{" "}
              </span>
              All the existing and new launched courses also available
            </p>
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee />
              <span>499</span>Only
            </p>
            <div className="text-gray-200">
              <p>100% refund on cancellation</p>
              <p>* Terms and conditions applied *</p>
            </div>
            <CustomButton type="submit" title="Buy Now" designType="submit" />
          </div>
        </div>
      </form>
    </HomeLayout>
  );
};
