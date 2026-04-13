import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { IAuthUser } from "@/types/auth";
import { mapUser } from "@/utils/mapUser";

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

export const mapAuthUser = (user: User): IAuthUser | null => {
  return user ? mapUser(user) : null;
};
