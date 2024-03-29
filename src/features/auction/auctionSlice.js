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
  isBidError: false,
  isBidSuccess: false,
  isPlaceBidLoading: false,
  subscribeToAuctionLoading: false,
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

// Function to place a new bid
export const placeBid = createAsyncThunk("auction/bid", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/auction/${data.bookId}/bid`, data.bidInfo);
    return response.data.auction;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error);
  }
});

// Function to subscribe to the auction
export const subscribeToAuction = createAsyncThunk(
  "/auction/subscribe",
  async (auctionId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/auction/${auctionId}/subscribe`);
      return response.data.auction;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

const auctionSlice = createSlice({
  name: "auction",
  initialState,

  reducers: {
    updateAuctionAfterBid: (state, action) => {
      state.auction = action.payload;
      state.isBidSuccess = true;
    },
  },

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

    // Cases for placing a new bid
    builder.addCase(placeBid.pending, (state, action) => {
      state.isPlaceBidLoading = true;
    });
    builder.addCase(placeBid.fulfilled, (state, action) => {
      state.isPlaceBidLoading = false;
      state.isBidError = false;
      state.error = null;
      state.isBidSuccess = true;
      state.auction = action.payload;
    });
    builder.addCase(placeBid.rejected, (state, action) => {
      state.isPlaceBidLoading = false;
      state.isBidError = true;
      state.error = action.payload;
      state.isBidSuccess = false;
    });

    // Cases for subscribing to auction
    builder.addCase(subscribeToAuction.pending, (state, action) => {
      state.subscribeToAuctionLoading = true;
    });
    builder.addCase(subscribeToAuction.fulfilled, (state, action) => {
      state.subscribeToAuctionLoading = false;
      state.isError = false;
      state.error = null;
      state.isSuccess = true;
      state.auction.emailSubscribers = action.payload.emailSubscribers;
    });
    builder.addCase(subscribeToAuction.rejected, (state, action) => {
      state.subscribeToAuctionLoading = false;
      state.isError = true;
      state.error = action.payload;
      state.isSuccess = true;
    });
  },
});

export const { updateAuctionAfterBid } = auctionSlice.actions;
export default auctionSlice.reducer;
