import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { EndPoints } from "../../constants/EndPoints";
import axiosInstance from "../../helpers/axiosInstance";
import { promiseToaster, showToaster } from "../../utils/ToasterService";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

export const getRazorpayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = axiosInstance.get(EndPoints.Payment.RazorpayId);
    return (await response).data;
  } catch (error) {
    showToaster("error", "Failed to load data");
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
    try {
      const response = axiosInstance.post(EndPoints.Payment.VerifyPayment, {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      return (await response).data;
    } catch (error) {
      showToaster("error", error?.response?.data?.message ?? error.message);
    }
  }
);

export const getPaymentRecord = createAsyncThunk(
  "/payments/record",
  async () => {
    const response = promiseToaster(
      axiosInstance.get(EndPoints.Payment.PaymentRecords),
      "getting the payment records"
    );
    return (await response).data;
  }
);

export const cancelCourseBundle = createAsyncThunk(
  "/payments/cancel",
  async () => {
    const response = promiseToaster(
      axiosInstance.post(EndPoints.Payment.CancelCourseBundle),
      "Unsubscribing the bundle"
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
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        if (action.payload) {
          state.isPaymentVerified = action.payload.success;
          showToaster("success", action?.payload?.message);
        }
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        if (action.payload) {
          state.isPaymentVerified = action.payload.success;
          showToaster("error", action?.payload?.message);
        }
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        if (action.payload) {
          state.allPayments = action.payload.allPayments;
          state.finalMonths = action.payload.finalMonths;
          state.monthlySalesRecord = action.payload.monthlySalesRecord;
        }
      });
  },
});

export const useSelectorRazorpayState = () => {
  const razorpayState = useSelector((state) => state?.razorpay);
  return razorpayState;
};

export default razorpaySlice.reducer;
