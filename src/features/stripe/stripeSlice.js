import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axios/axiosInstance";

const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  setupStripeAccountLoading: false,
  stripeLink: null,
  stripePaymentLoading: false,
  stripeSession: null,
};

// Valdate and setup the stripe account
export const setupStripeAccount = createAsyncThunk(
  "stripe/setup",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/stripe/create-link");
      return response.data.link;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Pay for a book
export const stripePayment = createAsyncThunk("stripe/payment", async (_, { rejectWithValie }) => {
  try {
    const response = await axiosInstance.get("/stripe/payment");
    console.log("STRIPE", response.data);
    return response.data.session;
  } catch (err) {
    return rejectWithValie(err.response?.data?.error);
  }
});
export const stripeCharge = createAsyncThunk("stripe/charge", async (_, { rejectWithValie }) => {
  try {
    const response = await axiosInstance.get("/stripe/charge");
    console.log("STRIPE", response.data);
    return response.data.charge;
  } catch (err) {
    return rejectWithValie(err.response?.data?.error);
  }
});

const stripeSlice = createSlice({
  name: "stripe",
  initialState,

  // reducers: {},

  extraReducers: (builder) => {
    // Stripe account setup cases
    builder.addCase(setupStripeAccount.pending, (state) => {
      state.setupStripeAccountLoading = true;
    });
    builder.addCase(setupStripeAccount.fulfilled, (state, action) => {
      state.setupStripeAccountLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.stripeLink = action.payload;
    });
    builder.addCase(setupStripeAccount.rejected, (state, action) => {
      state.setupStripeAccountLoading = false;
      state.error = action.payload;
      state.isError = true;
      state.error = action.payload;
    });

    // Stripe payment cases
    builder.addCase(stripePayment.pending, (state) => {
      state.stripePaymentLoading = true;
    });
    builder.addCase(stripePayment.rejected, (state, action) => {
      state.stripePaymentLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
    builder.addCase(stripePayment.fulfilled, (state, action) => {
      state.stripePaymentLoading = false;
      state.isSuccess = true;
      state.error = null;
      state.isError = false;
      state.stripeSession = action.payload;
    });
  },
});

export default stripeSlice.reducer;
