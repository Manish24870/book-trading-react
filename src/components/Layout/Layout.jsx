import { Routes, Route } from "react-router-dom";

import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import AddBook from "../AddBook/AddBook";
import Navbar from "./Navbar";
import PrivateRoute from "../auth/PrivateRoute";
import AllBooks from "../books/AllBooks/AllBooks";
import SellBooks from "../books/SellBooks/SellBooks";

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
        </Route>
      </Routes>
    </div>
  );
};

export default Layout;
