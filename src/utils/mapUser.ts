import type { User } from "@supabase/supabase-js";
import type { IAuthUser } from "../types/Auth";

export const mapUser = (
  user: User | null,
  role: "user" | "admin" = "user",
): IAuthUser | null => {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email ?? "",
    role,
    email_verified: user.email_confirmed_at ? true : false,
  };
};
