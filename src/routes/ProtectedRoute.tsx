import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { PAGE } from "../pages/pageConfig";

const ProtectedRoute = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return <Navigate to={PAGE.LOGIN} replace />;
  return <Outlet />;
};

export default ProtectedRoute;
