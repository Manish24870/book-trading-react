import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";

const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  conversations: null,
  fetchConversationsLoading: false,
  conversationMessages: null,
  conversationMessagesLoading: false,
  allUsers: null,
  allUsersLoading: false,
  fetchUserSuccess: false,
  isFetchUserError: false,
  fetchUserError: null,
};

// Function to fetch all conversations of a user
export const fetchConversations = createAsyncThunk(
  "book/fetch-conversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/conversation");
      return response.data.conversations;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Function to fetch the list of all users
export const fetchUsers = createAsyncThunk("book/fetch-users", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/user/users");
    return response.data.users;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error);
  }
});

const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    setArrivedMessage: (state, action) => {
      state.conversationMessages = [...state.conversationMessages, action.payload];
    },
  },

  extraReducers: (builder) => {
    // Get all conversations cases
    builder.addCase(fetchConversations.pending, (state) => {
      state.fetchConversationsLoading = true;
    });
    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.fetchConversationsLoading = false;
      state.isError = false;
      state.error = null;
      state.conversations = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(fetchConversations.rejected, (state, action) => {
      state.fetchConversationsLoading = false;
      state.isError = true;
      state.error = action.payload;
      state.isSuccess = false;
    });

    // Get all users cases
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.allUsersLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.allUsersLoading = false;
      state.isFetchUserError = false;
      state.fetchUserError = null;
      state.fetchUserSuccess = true;
      state.isFetchUserError = false;
      state.allUsers = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.allUsersLoading = false;
      state.isFetchUserError = true;
      state.fetchUserError = action.payload;
    });
  },
});

export const { setArrivedMessage } = chatSlice.actions;
export default chatSlice.reducer;
