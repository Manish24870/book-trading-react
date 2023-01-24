import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axios/axiosInstance";

const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  loadWalletLoading: false,
  getWalletLoading: false,
  wallet: null,
  loadWalletSessionUrl: null,
  buyBookLoading: false,
  order: null,
};

// Fetch the user wallet
export const getWallet = createAsyncThunk("wallet/get", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/wallet/get");
    return response.data.wallet;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error);
  }
});

// Load the user wallet
export const loadWallet = createAsyncThunk(
  "wallet/load",
  async (walletData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/wallet/load", walletData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Checkout
export const buyBook = createAsyncThunk("wallet/buy", async (checkoutData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/wallet/buy", checkoutData);
    return response.data.order;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error);
  }
});

const walletSlice = createSlice({
  name: "wallet",
  initialState,

  extraReducers: (builder) => {
    // Fetch wallet cases
    builder.addCase(getWallet.pending, (state) => {
      state.getWalletLoading = true;
    });
    builder.addCase(getWallet.fulfilled, (state, action) => {
      state.getWalletLoading = false;
      state.isSuccess = true;
      state.wallet = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(getWallet.rejected, (state, action) => {
      state.getWalletLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
    });

    // Wallet load cases
    builder.addCase(loadWallet.pending, (state) => {
      state.loadWalletLoading = true;
    });
    builder.addCase(loadWallet.fulfilled, (state, action) => {
      state.loadWalletLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.wallet = action.payload?.wallet;
      state.loadWalletSessionUrl = action.payload?.sessionUrl;
    });
    builder.addCase(loadWallet.rejected, (state, action) => {
      state.loadWalletLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
    });

    // Buy book cases
    builder.addCase(buyBook.pending, (state) => {
      state.buyBookLoading = true;
    });
    builder.addCase(buyBook.fulfilled, (state, action) => {
      state.buyBookLoading = false;
      state.isError = false;
      state.error = null;
      state.isSuccess = true;
      state.order = action.payload;
    });
    builder.addCase(buyBook.rejected, (state, action) => {
      state.buyBookLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = action.payload;
    });
  },
});

export default walletSlice.reducer;
