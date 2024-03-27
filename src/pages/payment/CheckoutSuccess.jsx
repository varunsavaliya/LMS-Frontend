import React, { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import HomeLayout from "../../layouts/HomeLayout";
import { RxCrossCircled } from "react-icons/rx";

export const CheckoutSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.success) navigate(AllRoutes.Checkout);
  }, []);
  return (
    <HomeLayout>
      <div className="container-wrapper text-white">
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1
            className={`${
              state?.success ? "bg-green-500" : "bg-red-500"
            } absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg`}
          >
            {state?.success ? "Payment Successful" : "Payment failed"}
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">
                {state?.success
                  ? "Welcome to the pro bundle"
                  : "Oops ! Your payment failed"}
              </h2>
              <p className="text-left">
                {state?.success
                  ? "Now you can enjoy all the courses."
                  : "Please try again later"}
              </p>
            </div>
            {state?.success ? (
              <AiFillCheckCircle className="text-green-500 text-5xl" />
            ) : (
              <RxCrossCircled className="text-red-500 text-5xl" />
            )}
          </div>

          <Link
            to={AllRoutes.Home}
            className={`${
              state?.success
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }  transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-xl font-semibold text-center rounded-br-lg rounded-bl-lg`}
          >
            <button>Go to dashboard</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
};
