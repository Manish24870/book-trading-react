import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <Routes></Routes>
    </div>
  );
};

export default Layout;
