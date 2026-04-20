import { supabase } from "@/lib/supabase";
import type { IAuthUser } from "@/types/auth/auth";
import { mapUser } from "@/features/auth/utils/mapUser";

export const getCurrentAuthUser = async (): Promise<IAuthUser | null> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  return user ? mapUser(user) : null;
};

export const reauthenticate = async (
  email: string,
  password: string,
): Promise<void> => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
};
