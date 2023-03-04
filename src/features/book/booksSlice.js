import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";
import isEmpty from "../../utils/isEmpty";

const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  fetchBooksLoading: false,
  books: null,
  adminBooksLoading: false,
  adminBooks: null,
  changeAvailabilitySuccess: false,
  changeAvailabilityLoading: false,
};

// Fetch all the books
export const fetchBooks = createAsyncThunk(
  "books/all",
  async (type = "All", { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/books?type=${type}`);
      return response.data.books;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Fetch all the books for admin
export const fetchBooksAdmin = createAsyncThunk(
  "books/all-admin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/books/all`);
      return response.data.books;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Fetch all the books for admin
export const changeBookAvailability = createAsyncThunk(
  "books/change-availability",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/books/change-availability/${data.bookId}`, {
        newAvailability: data.newAvailability,
      });
      return response.data.book;
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

    // Fetch all admin books cases
    builder.addCase(fetchBooksAdmin.pending, (state) => {
      state.adminBooksLoading = true;
    });
    builder.addCase(fetchBooksAdmin.fulfilled, (state, action) => {
      state.adminBooksLoading = false;
      state.adminBooks = action.payload;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchBooksAdmin.rejected, (state, action) => {
      state.adminBooksLoading = false;
      state.isError = true;
      state.error = action.payload;
    });

    // Change book availability cases
    builder.addCase(changeBookAvailability.pending, (state) => {
      state.changeAvailabilityLoading = true;
    });
    builder.addCase(changeBookAvailability.fulfilled, (state, action) => {
      state.changeAvailabilitySuccess = true;
      state.changeAvailabilityLoading = false;
      state.error = null;
      state.isError = false;
      let updateIndex = state.adminBooks.findIndex((el) => el._id === action.payload._id);
      state.adminBooks[updateIndex] = action.payload;
    });
    builder.addCase(changeBookAvailability.rejected, (state, action) => {
      state.changeAvailabilitySuccess = false;
      state.changeAvailabilityLoading = false;
      state.error = action.payload;
      state.isError = true;
    });
  },
});

export const { reset } = booksSlice.actions;
export default booksSlice.reducer;
