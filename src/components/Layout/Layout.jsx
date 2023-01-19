import { Routes, Route } from "react-router-dom";
import store from "../../app/store";

import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import AddBook from "../AddBook/AddBook";
import Navbar from "./Navbar";
import PrivateRoute from "../auth/PrivateRoute";
import AllBooks from "../books/AllBooks/AllBooks";
import SellBooks from "../books/SellBooks/SellBooks";
import SellBook from "../book/SellBook/SellBook";
import Cart from "../cart/Cart";
import Checkout from "../checkout/Checkout";

import { initializeCartItems } from "../../features/cart/cartSlice";
import isEmpty from "../../utils/isEmpty";

// Load cart when the app loads
if (localStorage.cart) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!isEmpty(cart)) {
    store.dispatch(initializeCartItems(cart));
  }
}

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/" element={<AllBooks />} />
          <Route path="/sell" element={<SellBooks />} />
          <Route path="/sell/:bookId" element={<SellBook />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Layout;
