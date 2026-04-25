import { useAppSelector } from "@/hooks/redux";
import type { IProfileRole } from "@/types/profile/profile";
import { checkRole } from "../utils/checkRole";

export const useRole = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);

  return {
    role: profile?.role,
    isVerified: !!user?.email_verified,
    isRole: (allowed: IProfileRole | IProfileRole[]) =>
      checkRole(profile?.role, allowed),
    isUser: checkRole(profile?.role, "user"),
    isCourier: checkRole(profile?.role, "courier"),
    isAdmin: checkRole(profile?.role, "admin"),
    isDeveloper: checkRole(profile?.role, "developer"),
  };
};
