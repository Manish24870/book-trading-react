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
import MyProfile from "../myProfile/MyProfile";
import Onboard from "../stripe/Onboard";
import CheckoutSuccess from "../checkout/CheckoutSuccess";
import ExchangeBooks from "../books/ExchangeBooks/ExchangeBooks";
import ExchangeBook from "../book/ExchangeBook/ExchangeBook";
import ExchangeOffers from "../ExchangeOffers/ExchangeOffers";
import AuctionBooks from "../books/AuctionBooks/AuctionBooks";
import AuctionBook from "../book/AuctionBook/AuctionBook";
import AuctionBookSettings from "../book/AuctionBook/AuctionBookSettings/AuctionBookSettings";
import Auction from "../Auction/Auction";
import Chat from "../chat/Chat";
import ExchangeInitiates from "../ExchangeInitiates/ExchangeInitiates";

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
          <Route path="/exchange" element={<ExchangeBooks />} />
          <Route path="/exchange/offers" element={<ExchangeOffers />} />
          <Route path="/exchange/initiates" element={<ExchangeInitiates />} />
          <Route path="/exchange/:bookId" element={<ExchangeBook />} />
          <Route path="/auction" element={<AuctionBooks />} />
          <Route path="/auction/:bookId" element={<AuctionBook />} />
          <Route path="/auction/:bookId/settings" element={<AuctionBookSettings />} />
          <Route path="/auction/:bookId/running" element={<Auction />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/onboard" element={<Onboard />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Layout;
