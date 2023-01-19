import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios/axiosInstance";
import isEmpty from "../../utils/isEmpty";
import { successNotification } from "../../utils/notification/showNotification";
const initialState = {
  error: null,
  isError: false,
  isSuccess: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    reset: (state) => {
      state.error = null;
      state.isError = false;
      state.isSuccess = false;
    },

    // Load cart items on app start
    initializeCartItems: (state, action) => {
      state.cartItems = action.payload.cartItems;
    },

    // Add a book to cart
    addToCart: (state, action) => {
      let alreadyAdded = state.cartItems.findIndex((el) => el._id === action.payload._id);
      if (alreadyAdded >= 0) {
        state.cartItems[alreadyAdded].quantity += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      // Save the cart to localstorage
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.cartItems,
        })
      );
      successNotification({ title: "Cart action success", message: "The book was added to cart" });
    },

    // Remove a book from cart
    removeFromCart: (state, action) => {
      let alreadyAdded = state.cartItems.findIndex((el) => el._id === action.payload);
      if (alreadyAdded >= 0) {
        state.cartItems.splice(alreadyAdded, 1);
      }

      // Save the cart to localstorage
      localStorage.setItem({
        cartItems: state.cartItems,
      });
      successNotification({
        title: "Cart action success",
        message: "The book was removed from cart",
      });
    },

    // Clear the cart
    clearCart: (state, action) => {
      localStorage.removeItem("cart");
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, initializeCartItems } = cartSlice.actions;
export default cartSlice.reducer;
