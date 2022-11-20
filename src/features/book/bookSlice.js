import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";
import isEmpty from "../../utils/isEmpty";

const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  addBookLoading: false,
};

// Add a new book
export const addBook = createAsyncThunk("book/add", async (bookInfo, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/books/add", bookInfo);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error);
  }
});

const bookSlice = createSlice({
  name: "book",
  initialState,

  reducers: {
    reset: (state) => {
      state.error = null;
      state.isError = false;
      state.isSuccess = false;
      state.addBookLoading = false;
    },
    setAddBookLoading: (state, action) => {
      state.addBookLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Add book cases
    builder.addCase(addBook.pending, (state) => {
      state.addBookLoading = true;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.addBookLoading = false;
      state.error = null;
      state.isSuccess = true;
    });
    builder.addCase(addBook.rejected, (state, action) => {
      state.addBookLoading = false;
      state.error = action.payload;
      state.isError = true;
    });
  },
});

export const { reset, setAddBookLoading } = bookSlice.actions;
export default bookSlice.reducer;
