import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";
import isEmpty from "../../utils/isEmpty";

const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  fetchMyExchangeBooksLoading: false,
  myExchangeBooks: null,
  createExchangeLoading: false,
  createExchangeSuccess: false,
  isCreateExchangeError: false,
  myInitiates: null,
  myInitiatesLoading: false,
  isMyInitiatesError: false,
  isMyInitiatesSuccess: false,
  myOffersLoading: false,
  myOffers: null,
  isAcceptOfferSuccess: false,
};

// Function to get my books placed for exchange
export const getMyExchangeBooks = createAsyncThunk(
  "exchange/fetchMyExchangeBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/exchange/my-exchange-books");
      return response.data.books;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Function to get my books placed for exchange
export const getMyInitiates = createAsyncThunk(
  "exchange/my-initiates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/exchange/my-initiates");
      return response.data.myInitiates;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Function to get my exchange offers
export const getMyOffers = createAsyncThunk(
  "exchange/my-offers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/exchange/my-offers");
      return response.data.myOffers;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Function to accept an offer
export const acceptOffer = createAsyncThunk(
  "exchange/accept-offer",
  async (offerData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/exchange/accept-offer`, offerData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Function to create a new exchange
export const createExchange = createAsyncThunk(
  "exchange/create",
  async (exchangeData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/exchange/create", exchangeData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // Fetch my exchange books cases
    builder.addCase(getMyExchangeBooks.pending, (state) => {
      state.fetchMyExchangeBooksLoading = true;
    });
    builder.addCase(getMyExchangeBooks.fulfilled, (state, action) => {
      state.fetchMyExchangeBooksLoading = false;
      state.isSuccess = true;
      state.error = null;
      state.isError = false;
      state.myExchangeBooks = action.payload;
    });
    builder.addCase(getMyExchangeBooks.rejected, (state, action) => {
      state.fetchMyExchangeBooksLoading = false;
      state.error = action.payload;
      state.isError = true;
      state.isSuccess = false;
    });

    // Create a new exchange cases
    builder.addCase(createExchange.pending, (state) => {
      state.createExchangeLoading = true;
    });
    builder.addCase(createExchange.fulfilled, (state, action) => {
      state.createExchangeLoading = false;
      state.createExchangeSuccess = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(createExchange.rejected, (state, action) => {
      state.createExchangeLoading = false;
      state.isCreateExchangeError = true;
      state.createExchangeSuccess = false;
      state.error = action.payload;
    });

    // Get my initiates cases
    builder.addCase(getMyInitiates.pending, (state) => {
      state.myInitiatesLoading = true;
    });
    builder.addCase(getMyInitiates.fulfilled, (state, action) => {
      state.myInitiatesLoading = false;
      state.myInitiates = action.payload;
      state.isMyInitiatesError = false;
      state.isMyInitiatesSuccess = true;
      state.error = null;
    });
    builder.addCase(getMyInitiates.rejected, (state, action) => {
      state.myInitiatesLoading = false;
      state.isMyInitiatesError = true;
      state.isMyInitiatesSuccess = false;
      state.error = action.payload;
    });

    // Get my offers cases
    builder.addCase(getMyOffers.pending, (state) => {
      state.myOffersLoading = true;
      state.isAcceptOfferSuccess = false;
    });
    builder.addCase(getMyOffers.fulfilled, (state, action) => {
      state.myOffersLoading = false;
      state.isError = false;
      state.error = null;
      state.myOffers = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getMyOffers.rejected, (state, action) => {
      state.myOffersLoading = false;
      state.isError = true;
      state.error = action.payload;
      state.isSuccess = false;
    });

    // Accept an offer cases
    builder.addCase(acceptOffer.fulfilled, (state, action) => {
      state.isAcceptOfferSuccess = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(acceptOffer.rejected, (state, action) => {
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export default exchangeSlice.reducer;
