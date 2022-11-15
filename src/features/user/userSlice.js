import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";
import setAuthToken from "../../utils/auth/setAuthToken";

const initialState = {
  isAuthenticated: false,
  user: null,
  userLoading: false,
  error: null,
  isError: false,
  isSuccess: false,
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", userInfo);
      return response?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    reset: (state) => {
      state.userLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.userLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.user = action.payload.data.user;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.userLoading = false;
      state.user = null;
      console.log("ERROR", action.payload);
      state.error = action.payload;
      state.isError = true;
    });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
