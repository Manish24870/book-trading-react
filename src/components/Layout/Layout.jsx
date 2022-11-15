import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../auth/Register/Register";

import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Layout;
