import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";

const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  auction: null,
  fetchAuctionLoading: false,
  saveAuctionSettingsLoading: false,
  saveAuctionSettingsSuccess: false,
};

// Function to fetch an auction
export const getAuction = createAsyncThunk(
  "auction/fetch-acution",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/auction/${bookId}`);
      return response.data.auction;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Function to save auction settings
export const saveAuctionSettings = createAsyncThunk(
  "auction/save-settings",
  async (auctionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/auction/${auctionData.bookId}/save-settings`,
        auctionData.data
      );
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

const auctionSlice = createSlice({
  name: "auction",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // Cases for getting an auction
    builder.addCase(getAuction.pending, (state) => {
      state.fetchAuctionLoading = true;
    });
    builder.addCase(getAuction.fulfilled, (state, action) => {
      state.fetchAuctionLoading = false;
      state.isError = false;
      state.error = null;
      state.isSuccess = true;
      state.auction = action.payload;
    });
    builder.addCase(getAuction.rejected, (state, action) => {
      state.fetchAuctionLoading = false;
      state.isError = true;
      state.error = action.payload;
      state.isSuccess = false;
    });

    // Cases for saving the auction settings
    builder.addCase(saveAuctionSettings.pending, (state, action) => {
      state.saveAuctionSettingsLoading = true;
    });
    builder.addCase(saveAuctionSettings.fulfilled, (state, action) => {
      state.saveAuctionSettingsLoading = false;
      state.saveAuctionSettingsSuccess = true;
      state.isError = false;
      state.error = null;
      state.isSuccess = true;
    });
    builder.addCase(saveAuctionSettings.rejected, (state, action) => {
      state.saveAuctionSettingsLoading = false;
      state.saveAuctionSettingsSuccess = false;
      state.isError = true;
      state.error = action.payload;
      state.isSuccess = false;
    });
  },
});

export default auctionSlice.reducer;
