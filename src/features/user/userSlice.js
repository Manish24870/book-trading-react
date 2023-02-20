import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

import axiosInstance from "../../utils/axios/axiosInstance";
import setAuthToken from "../../utils/auth/setAuthToken";
import isEmpty from "../../utils/isEmpty";
import { successNotification } from "../../utils/notification/showNotification";
import { removeUserProfile, getUserProfile } from "../profile/profileSlice";

const initialState = {
  isAuthenticated: false,
  user: null,
  userLoading: false,
  error: null,
  isError: false,
  isSuccess: false,
  users: null,
  fetchUsersLoading: false,
  fetchUsersSuccess: false,
};

// Register a new user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userInfo, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/auth/register", userInfo);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk("user/login", async (userInfo, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/login", userInfo);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error);
  }
});

// Get all the users
export const getAllUsers = createAsyncThunk("user/get-users", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/user/users");
    return response.data.users;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error);
  }
});

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
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.userLoading = false;
      state.isAuthenticated = !isEmpty(action.payload);
      state.user = isEmpty(action.payload) ? null : action.payload;
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("jwt");
      setAuthToken(false);
      state.user = null;
      state.isAuthenticated = false;
      successNotification({ title: "Success", message: "Logged out successfully" });
    },
  },

  extraReducers: (builder) => {
    // Register cases
    builder.addCase(registerUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      localStorage.setItem("jwt", action.payload.token);
      setAuthToken(action.payload.token);
      const decoded = jwt_decode(action.payload.token);
      state.userLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.user = decoded;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.userLoading = false;
      state.user = null;
      state.error = action.payload;
      state.isError = true;
    });

    // Login cases
    builder.addCase(loginUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem("jwt", action.payload.token);
      setAuthToken(action.payload.token);
      const decoded = jwt_decode(action.payload.token);
      state.userLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.user = decoded;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.userLoading = false;
      state.user = null;
      state.error = action.payload;
      state.isError = true;
    });

    // Get all users cases
    builder.addCase(getAllUsers.pending, (state) => {
      state.fetchUsersLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.fetchUsersLoading = false;
      state.error = null;
      state.isError = false;
      state.fetchUsersSuccess = true;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.fetchUsersLoading = false;
      state.error = action.payload;
      state.isError = true;
      state.fetchUsersSuccess = false;
    });
  },
});

export const { reset, setUserLoading, setCurrentUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
