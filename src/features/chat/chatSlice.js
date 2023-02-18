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
  },
});

export const { setArrivedMessage } = chatSlice.actions;
export default chatSlice.reducer;
