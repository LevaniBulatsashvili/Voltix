import { supabase } from "../../../lib/supabase";
import type { IUser } from "../../../types/User";

export const userService = {
  getUser: async (): Promise<IUser | null> => {
    // Fetch the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) return null;

    // Fetch additional user profile data from 'users' table
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;
    return data as IUser;
  },

  updateUser: async (updates: Partial<IUser>): Promise<IUser> => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", user.id)
      .single();

    if (error) throw error;
    return data as IUser;
  },
};
