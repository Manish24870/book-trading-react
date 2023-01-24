import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";

const initialState = {
  userProfile: null,
  userProfileLoading: false,
  error: null,
  isError: false,
  isSuccess: false,
};

// Get user profile
export const getUserProfile = createAsyncThunk("profile/get", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/user/get");
    return response.data.userProfile;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    setUserProfileLoading: (state, action) => {
      state.userProfileLoading = action.payload;
    },
    removeUserProfile: (state, action) => {
      state.userProfile = null;
    },
  },

  extraReducers: (builder) => {
    // Fetch user profile
    builder.addCase(getUserProfile.pending, (state, action) => {
      state.userProfileLoading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfileLoading = false;
      state.error = null;
      state.isError = false;
      state.isSuccess = true;
      state.userProfile = action.payload;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.userProfileLoading = false;
      state.error = action.payload;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});
export const { setUserProfileLoading, removeUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
