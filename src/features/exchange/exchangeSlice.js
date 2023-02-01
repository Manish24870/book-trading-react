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
  },
});

export default exchangeSlice.reducer;
