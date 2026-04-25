import type { IProfileRole } from "@/types/profile/profile";

export const checkRole = (
  role: string | undefined | null,
  allowed: IProfileRole | IProfileRole[],
): boolean => {
  if (!role) return false;
  return Array.isArray(allowed)
    ? allowed.includes(role as IProfileRole)
    : role === allowed;
};
