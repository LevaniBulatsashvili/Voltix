import type { User } from "@supabase/supabase-js";
import type { IAuthUser } from "@/types/auth/auth";

export const mapUser = (user: User | null): IAuthUser | null => {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email ?? null,
    email_verified: user.email_confirmed_at ? true : false,
    created_at: user.created_at ?? "",
    app_metadata: user.app_metadata ?? {},
  };
};
