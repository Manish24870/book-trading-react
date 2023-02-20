import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Loading from "../common/Loading";

const PrivateRoute = ({ allowedRoles }) => {
  const location = useLocation();

  const { isAuthenticated, userLoading } = useSelector((state) => state.user);

  if (userLoading) {
    return <Loading />;
  } else if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
