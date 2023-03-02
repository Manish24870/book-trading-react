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
  changeRoleLoading: false,
  changeRoleSuccess: false,
  writeReviewLoading: false,
  writeReviewSuccess: false,
  myOrders: null,
  myOrdersLoading: false,
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

// Change user role
export const changeUserRole = createAsyncThunk(
  "user/change-role",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/user/change-role/${data.userId}`, {
        newRole: data.newRole,
      });
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Write a review
export const writeReview = createAsyncThunk(
  "user/write-review",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/user/review/add`, data);
      return response.data.review;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Fetch the current user orders
export const getMyOrders = createAsyncThunk(
  "user/get-my-orders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/my-orders");
      return response.data.orders;
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

    // Change user role cases
    builder.addCase(changeUserRole.pending, (state) => {
      state.changeRoleLoading = true;
    });
    builder.addCase(changeUserRole.fulfilled, (state, action) => {
      state.changeRoleLoading = false;
      state.error = null;
      state.isError = false;
      state.changeRoleSuccess = true;
      let updateIndex = state.users.findIndex((el) => el._id === action.payload._id);
      state.users[updateIndex] = action.payload;
    });
    builder.addCase(changeUserRole.rejected, (state, action) => {
      state.changeRoleLoading = false;
      state.error = action.payload;
      state.isError = true;
      state.changeRoleSuccess = false;
    });

    // Write a review cases
    builder.addCase(writeReview.pending, (state) => {
      state.writeReviewLoading = true;
    });
    builder.addCase(writeReview.fulfilled, (state) => {
      state.writeReviewLoading = false;
      state.writeReviewSuccess = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(writeReview.rejected, (state, action) => {
      state.writeReviewLoading = false;
      state.writeReviewSuccess = false;
      state.isError = true;
      state.error = action.payload;
    });

    // Get my orders cases
    builder.addCase(getMyOrders.pending, (state, action) => {
      state.myOrdersLoading = true;
    });
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.myOrdersLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.myOrders = action.payload;
    });
    builder.addCase(getMyOrders.rejected, (state, action) => {
      state.myOrdersLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export const { reset, setUserLoading, setCurrentUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
