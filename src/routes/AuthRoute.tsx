import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { PAGE } from "../pages/pageConfig";
import Spinner from "../components/feedback/Spinner";

interface IAuthRoute {
  requireAuth?: boolean;
  allowedRoles?: Array<"user" | "admin">;
  redirectPath?: string;
  requireEmailVerified?: boolean;
  guestOnly?: boolean;
}

const AuthRoute = ({
  requireAuth = false,
  allowedRoles,
  redirectPath,
  requireEmailVerified = false,
  guestOnly = false,
}: IAuthRoute) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) return <Spinner />;

  // Guest-only routes (Login/Register)
  if (guestOnly && user && user.email_verified)
    // Fully authenticated users get redirected
    return <Navigate to={redirectPath ?? PAGE.PRODUCTS} replace />;

  // Protected routes: redirect guests
  if (requireAuth && !user) {
    return <Navigate to={redirectPath ?? PAGE.LOGIN} replace />;
  }

  // Protected routes: role check
  if (requireAuth && allowedRoles && user && !allowedRoles.includes(user.role))
    return <Navigate to={redirectPath ?? PAGE.PRODUCTS} replace />;

  // Protected routes: email verification check
  if (requireAuth && requireEmailVerified && user && !user.email_verified)
    return <Navigate to={PAGE.VERIFY_EMAIL} replace />;

  return <Outlet />;
};

export default AuthRoute;
