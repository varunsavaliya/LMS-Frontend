import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { EndPoints } from "../../constants/EndPoints";
import { Messages } from "../../constants/Messages";
import axiosInstance from "../../helpers/axiosInstance";
import { promiseToaster, showToaster } from "../../utils/ToasterService";

const initialState = {
  key: "",
  subscription_id: "",
  allPayments: [],
  finalMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  monthlySalesRecord: [],
};

export const getRazorpayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = axiosInstance.get(EndPoints.Payment.RazorpayId);
    return (await response).data;
  } catch (error) {
    showToaster("error", error?.response?.data?.message ?? error.message);
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
      showToaster("error", error?.response?.data?.message ?? error.message);
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
      showToaster("error", error?.response?.data?.message ?? error.message);
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
        if (action.payload) state.key = action.payload.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        if (action.payload)
          state.subscription_id = action.payload.subscription_id;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        if (action.payload) {
          state.allPayments = action.payload?.data?.allPayments;
          state.monthlySalesRecord = action.payload?.data?.paymentsByMonth;
        }
      });
  },
});

export const useSelectorRazorpayState = () => {
  const razorpayState = useSelector((state) => state?.razorpay);
  return razorpayState;
};

export default razorpaySlice.reducer;
