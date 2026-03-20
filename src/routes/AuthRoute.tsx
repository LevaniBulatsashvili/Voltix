import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { PAGE } from "../pages/pageConfig";
import Spinner from "../components/feedback/Spinner";

interface IAuthRoute {
  requireAuth?: boolean;
  allowedRoles?: Array<"user" | "admin">;
  redirectPath?: string;
  requireEmailVerified?: boolean;
  guestOnly?: boolean; // For Login/Register
  verifyPagesOnly?: boolean; // For verify-email / verify-success
}

const AuthRoute = ({
  requireAuth = false,
  allowedRoles,
  redirectPath,
  requireEmailVerified = false,
  guestOnly = false,
  verifyPagesOnly = false,
}: IAuthRoute) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) return <Spinner />;

  // Guest-only pages: Login/Register
  if (guestOnly) {
    if (user && user.email_verified)
      return <Navigate to={redirectPath ?? PAGE.PRODUCTS} replace />;

    return <Outlet />;
  }

  // Verify pages: only for logged-in users without verified email
  if (verifyPagesOnly) {
    if (!user) return <Navigate to={PAGE.LOGIN} replace />;
    if (user.email_verified) return <Navigate to={PAGE.PRODUCTS} replace />; // redirect verified users

    return <Outlet />;
  }

  // Protected pages
  if (requireAuth && !user)
    return <Navigate to={redirectPath ?? PAGE.LOGIN} replace />;

  // Role check
  if (requireAuth && allowedRoles && user && !allowedRoles.includes(user.role))
    return <Navigate to={redirectPath ?? PAGE.PRODUCTS} replace />;

  // Email verification required
  if (requireAuth && requireEmailVerified && user && !user.email_verified)
    return <Navigate to={PAGE.VERIFY_EMAIL} replace />;

  return <Outlet />;
};

export default AuthRoute;
