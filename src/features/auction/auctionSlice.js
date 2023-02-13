import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";

const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  auction: null,
  fetchAuctionLoading: false,
};

// FUnction to fetch an auction
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
  },
});

export default auctionSlice.reducer;
