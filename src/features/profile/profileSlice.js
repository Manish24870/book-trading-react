import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";

const initialState = {
  myProfile: null,
  myProfileLoading: false,
  error: null,
  isError: false,
  isEditMyProfileError: false,
  isSuccess: false,
  isEditMyProfileSuccess: false,
  editMyProfileLoading: false,
};

// Get user profile
export const getMyProfile = createAsyncThunk("profile/get", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/user/get");
    return response.data.myProfile;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error);
  }
});

// Edit user profile
export const editProfile = createAsyncThunk(
  "profile/edit",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/edit", profileData, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.myProfile;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    reset: (state) => {
      state.myProfileLoading = false;
      state.error = null;
      state.isError = false;
      state.isEditMyProfileError = false;
      state.isSuccess = false;
      state.isEditMyProfileSuccess = false;
      state.editMyProfileLoading = false;
    },
    editMyProfileReset: (state) => {
      state.editMyProfileLoading = false;
      state.isEditMyProfileSuccess = false;
      state.isEditMyProfileError = false;
    },
    setMyProfileLoading: (state, action) => {
      state.myProfileLoading = action.payload;
    },
    removeMyProfile: (state, action) => {
      state.myProfile = null;
    },
  },

  extraReducers: (builder) => {
    // Fetch my profile cases
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

    // Edit my profile cases
    builder.addCase(editProfile.pending, (state) => {
      state.editMyProfileLoading = true;
    });

    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.editMyProfileLoading = false;
      state.error = null;
      state.isEditMyProfileError = false;
      state.isEditMyProfileSuccess = true;
      state.myProfile = action.payload;
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.editMyProfileLoading = false;
      state.error = action.payload;
      state.isEditMyProfileError = true;
      state.isEditMyProfileSuccess = false;
    });
  },
});
export const { setMyProfileLoading, removeMyProfile, reset, editMyProfileReset } =
  profileSlice.actions;
export default profileSlice.reducer;
