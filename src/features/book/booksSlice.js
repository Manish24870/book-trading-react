import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";
import isEmpty from "../../utils/isEmpty";

const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  fetchBooksLoading: false,
  books: null,
};

// Fetch all the books
export const fetchBooks = createAsyncThunk(
  "books/all",
  async (type = "all", { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/books?type=${type}`);
      return response.data.books;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,

  reducers: {
    reset: (state) => {
      state.error = null;
      state.isError = false;
      state.isSuccess = false;
      state.fetchBooksLoading = false;
      state.books = null;
    },
    setFetchBooksLoading: (state, action) => {
      state.fetchBooksLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Fetch all books cases
    builder.addCase(fetchBooks.pending, (state) => {
      state.fetchBooksLoading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.fetchBooksLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.fetchBooksLoading = false;
      state.error = action.payload;
      state.isError = true;
    });
  },
});

export const { reset } = booksSlice.actions;
export default booksSlice.reducer;
