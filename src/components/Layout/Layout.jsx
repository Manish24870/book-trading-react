import { Routes, Route, Navigate } from "react-router-dom";

import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Layout;
