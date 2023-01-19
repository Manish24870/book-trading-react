import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import bookReducer from "../features/book/bookSlice";
import booksReducer from "../features/book/booksSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    books: booksReducer,
    cart: cartReducer,
  },
});

export default store;
