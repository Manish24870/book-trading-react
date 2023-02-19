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
  getConversationLoading: false,
  conversationMessages: null,
  conversationMessagesLoading: false,
  fetchConversationMessagesSuccess: false,
  sendMessageLoading: false,
};

// Function to fetch all conversations of a user
export const fetchConversations = createAsyncThunk(
  "chat/fetch-conversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/conversation");
      return response.data.conversations;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Function to fetch a conversation
export const fetchConversation = createAsyncThunk(
  "chat/fetch-conversation",
  async (info, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/conversation", info);
      return response.data.conversation;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Function to fetch conversation messages
export const fetchConversationMessages = createAsyncThunk(
  "chat/fetch-conversation-messages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/message/${conversationId}`);
      return response.data.messages;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// Function to send a message
export const sendMessage = createAsyncThunk(
  "chat/send-message",
  async (message, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/message", message);
      return response.data.message;
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
      state.conversationMessages.push(action.payload);
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

    // Get a single conversation cases
    builder.addCase(fetchConversation.pending, (state, action) => {
      state.getConversationLoading = true;
    });
    builder.addCase(fetchConversation.fulfilled, (state, action) => {
      state.getConversationLoading = false;
      let alreadyContains = state.conversations.findIndex((el) => el._id === action.payload._id);
      if (alreadyContains < 0) {
        state.conversations.unshift(action.payload);
      }
    });
    builder.addCase(fetchConversation.rejected, (state, action) => {
      state.getConversationLoading = false;
      state.isError = true;
      state.error = action.payload;
    });

    // Get a single conversation messages
    builder.addCase(fetchConversationMessages.pending, (state, action) => {
      state.conversationMessagesLoading = true;
    });
    builder.addCase(fetchConversationMessages.fulfilled, (state, action) => {
      state.conversationMessagesLoading = false;
      state.fetchConversationMessagesSuccess = true;
      state.isError = false;
      state.error = null;
      state.conversationMessages = action.payload;
    });
    builder.addCase(fetchConversationMessages.rejected, (state, action) => {
      state.conversationMessagesLoading = false;
      state.isError = true;
      state.error = action.payload;
      state.isSuccess = false;
      state.fetchConversationMessagesSuccess = false;
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

    // Send a message cases
    builder.addCase(sendMessage.pending, (state, action) => {
      state.sendMessageLoading = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.sendMessageLoading = false;
      state.isError = false;
      state.error = null;
      state.conversationMessages.push(action.payload);
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.sendMessageLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export const { setArrivedMessage } = chatSlice.actions;
export default chatSlice.reducer;
