import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";
import { PAGE } from "@/pages/pageConfig";
import Spinner from "@/components/feedback/Spinner";
import { useFetchProfile } from "@/features/user/profile/hooks/profileCRUD";
import type { IProfile } from "@/types/user/profile";

interface IAuthRoute {
  requireAuth?: boolean;
  allowedRoles?: IProfile["role"];
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
  const { data: profile } = useFetchProfile(user?.id ?? "", !!user?.id);

  if (isLoading) return <Spinner />;

  // Guest-only pages: Login/Register
  if (guestOnly) {
    if (user && user.email_verified)
      return <Navigate to={PAGE.PUBLIC.SHOP} replace />;

    return <Outlet />;
  }

  // Verify pages: only for logged-in users without verified email
  if (verifyPagesOnly) {
    if (!user) return <Navigate to={PAGE.AUTH.LOGIN} replace />;
    if (user.email_verified) return <Navigate to={PAGE.PUBLIC.SHOP} replace />; // redirect verified users

    return <Outlet />;
  }

  // Protected pages
  if (requireAuth && !user)
    return <Navigate to={redirectPath ?? PAGE.AUTH.LOGIN} replace />;

  // Role check
  if (
    requireAuth &&
    allowedRoles &&
    profile &&
    !allowedRoles.includes(profile.role)
  )
    return <Navigate to={redirectPath ?? PAGE.PUBLIC.SHOP} replace />;

  // Email verification required
  if (requireAuth && requireEmailVerified && user && !user.email_verified)
    return <Navigate to={PAGE.AUTH.VERIFY_EMAIL} replace />;

  return <Outlet />;
};

export default AuthRoute;
