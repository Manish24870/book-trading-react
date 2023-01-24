import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";

const initialState = {
  myProfile: null,
  myProfileLoading: false,
  error: null,
  isError: false,
  isSuccess: false,
};

// Get user profile
export const getMyProfile = createAsyncThunk("profile/get", async (_, { rejectWithValue }) => {
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
    setMyProfileLoading: (state, action) => {
      state.myProfileLoading = action.payload;
    },
    removeMyProfile: (state, action) => {
      state.myProfile = null;
    },
  },

  extraReducers: (builder) => {
    // Fetch user profile
    builder.addCase(getMyProfile.pending, (state, action) => {
      state.myProfileLoading = true;
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.myProfileLoading = false;
      state.error = null;
      state.isError = false;
      state.isSuccess = true;
      state.myProfile = action.payload;
    });
    builder.addCase(getMyProfile.rejected, (state, action) => {
      state.myProfileLoading = false;
      state.error = action.payload;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});
export const { setMyProfileLoading, removeMyProfile } = profileSlice.actions;
export default profileSlice.reducer;
