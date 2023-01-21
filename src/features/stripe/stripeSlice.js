import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";

const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  setupStripeAccountLoading: false,
  stripeLink: null,
};

// Valdate and setup the stripe account
export const setupStripeAccount = createAsyncThunk(
  "stripe/setup",
  async (_, { rejectWithValie }) => {
    try {
      const response = await axiosInstance.get("/stripe/create-link");
      return response.data.link;
    } catch (err) {
      return rejectWithValie(err.response?.data?.error);
    }
  }
);

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
  },
});

export default stripeSlice.reducer;
