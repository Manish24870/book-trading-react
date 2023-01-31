import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";
import isEmpty from "../../utils/isEmpty";

const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  fetchMyExchangeBooksLoading: false,
  myExchangeBooks: null,
};

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
      state.fetchMyExchangeBooksLoading = true;
      state.isSuccess = true;
      state.error = null;
      state.isError = false;
      state.myExchangeBooks = action.payload;
    });
    builder.addCase(getMyExchangeBooks.rejected, (state, action) => {
      state.fetchMyExchangeBooksLoading = true;
      state.error = action.payload;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default exchangeSlice.reducer;
