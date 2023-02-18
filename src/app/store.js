import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import bookReducer from "../features/book/bookSlice";
import booksReducer from "../features/book/booksSlice";
import cartReducer from "../features/cart/cartSlice";
import stripeReducer from "../features/stripe/stripeSlice";
import walletReducer from "../features/wallet/walletSlice";
import profileReducer from "../features/profile/profileSlice";
import exchangeReducer from "../features/exchange/exchangeSlice";
import auctionReducer from "../features/auction/auctionSlice";
import chatReducer from "../features/chat/chatSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    books: booksReducer,
    cart: cartReducer,
    stripe: stripeReducer,
    wallet: walletReducer,
    profile: profileReducer,
    exchange: exchangeReducer,
    auction: auctionReducer,
    chat: chatReducer,
  },
});

export default store;
