import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EndPoints } from "../../constants/EndPoints";
import { FinalMonths } from "../../constants/FinalMonths";
import { Messages } from "../../constants/Messages";
import { promiseToaster, showToaster } from "../../utils/ToasterService";
import { useSelector } from "react-redux";
import axiosInstance from "../../helpers/axiosInstance";
import { ToasterType } from "../../constants/ToasterType";

const initialState = {
  key: "",
  subscription_id: "",
  allPayments: [],
  finalMonths: FinalMonths,
  monthlySalesRecord: [],
};

export const getRazorpayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = axiosInstance.get(EndPoints.Payment.RazorpayId);
    return (await response).data;
  } catch (error) {
    showToaster(
      ToasterType.Error,
      error?.response?.data?.message ?? error.message
    );
  }
});

export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async () => {
    try {
      const response = axiosInstance.post(
        EndPoints.Payment.PurchaseCourseBundle
      );
      return (await response).data;
    } catch (error) {
      showToaster(
        ToasterType.Error,
        error?.response?.data?.message ?? error.message
      );
    }
  }
);

export const verifyUserPayment = createAsyncThunk(
  "/payments/verify",
  async (data) => {
    const response = promiseToaster(
      axiosInstance.post(EndPoints.Payment.VerifyPayment, {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      }),
      Messages.Loading.Payment.Verify
    );
    return (await response).data;
  }
);

export const getPaymentRecord = createAsyncThunk(
  "/payments/record",
  async () => {
    try {
      const response = await axiosInstance.get(
        EndPoints.Payment.PaymentRecords
      );
      return response.data;
    } catch (error) {
      showToaster(
        ToasterType.Error,
        error?.response?.data?.message ?? error.message
      );
    }
  }
);

export const cancelCourseBundle = createAsyncThunk(
  "/payments/cancel",
  async () => {
    const response = promiseToaster(
      axiosInstance.post(EndPoints.Payment.CancelCourseBundle),
      Messages.Loading.Payment.Unsubscribe
    );
    return (await response).data;
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_id;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.data?.allPayments;
        state.monthlySalesRecord = action?.payload?.data?.paymentsByMonth;
      });
  },
});

export const useSelectorRazorpayState = () => {
  const razorpayState = useSelector((state) => state?.razorpay);
  return razorpayState;
};

export default razorpaySlice.reducer;
