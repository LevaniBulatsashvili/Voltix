import { supabase } from "../../../lib/supabase";
import type { IAddress, IUser } from "../../../types/User";

export const profileService = {
  createEmptyProfile: async (userId: string): Promise<IUser> => {
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        full_name: "",
        phone: null,
        avatar_url: null,
        created_at: new Date().toISOString(),
      })
      .single();

    if (error) throw error;
    return data as IUser;
  },
  addAddress: async (
    userId: string,
    address: Omit<IAddress, "id" | "user_id">,
  ) => {
    const { data, error } = await supabase
      .from("addresses")
      .insert({
        ...address,
        user_id: userId,
      })
      .single();

    if (error) throw error;
    return data as IAddress;
  },
};
