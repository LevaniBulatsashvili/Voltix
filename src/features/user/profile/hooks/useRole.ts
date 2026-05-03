import { useAppSelector } from "@/hooks/redux";
import type { IProfileRole } from "@/types/profile/profile";
import { checkRole } from "../utils/checkRole";
import { useCallback, useMemo } from "react";
import { shallowEqual } from "react-redux";

export const useRole = () => {
  const user = useAppSelector((state) => state.auth.user, shallowEqual);
  const profile = useAppSelector(
    (state) => state.profile.profile,
    shallowEqual,
  );
  const isRole = useCallback(
    (allowed: IProfileRole | IProfileRole[]) =>
      checkRole(profile?.role, allowed),
    [profile?.role],
  );

  return useMemo(
    () => ({
      role: profile?.role,
      isVerified: !!user?.email_verified,
      isRole,
      isUser: checkRole(profile?.role, "user"),
      isCourier: checkRole(profile?.role, "courier"),
      isAdmin: checkRole(profile?.role, "admin"),
      isDeveloper: checkRole(profile?.role, "developer"),
    }),
    [profile?.role, user?.email_verified, isRole],
  );
};
