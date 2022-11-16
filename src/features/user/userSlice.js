import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";
import setAuthToken from "../../utils/auth/setAuthToken";
import isEmpty from "../../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: null,
  userLoading: false,
  error: null,
  isError: false,
  isSuccess: false,
};

// Register a new user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userInfo, { rejectWithValue }) => {
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
  },

  extraReducers: (builder) => {
    // Register cases
    builder.addCase(registerUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.userLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("jwt", action.payload.token);
      setAuthToken(action.payload.token);
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
      state.userLoading = false;
      state.error = null;
      state.isSuccess = true;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("jwt", action.payload.token);
      setAuthToken(action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.userLoading = false;
      state.user = null;
      state.error = action.payload;
      state.isError = true;
    });
  },
});

export const { reset, setUserLoading, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
