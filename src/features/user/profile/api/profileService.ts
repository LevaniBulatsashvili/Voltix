import { supabase } from "../../../../lib/supabase";
import type { IProfile, IAddress } from "../../../../types/Profile";

export const profileService = {
  getProfile: async (): Promise<IProfile | null> => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*, address(*)")
      .eq("id", user.id)
      .single();

    const address = data.address?.[0] ?? null;

    if (error) throw error;

    return {
      ...data,
      email: user.email,
      address,
    } as IProfile;
  },

  updateProfile: async (updates: Partial<IProfile>): Promise<IProfile> => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();

    if (error) throw error;

    return {
      ...data,
      email: user.email,
    } as IProfile;
  },

  getAddresses: async (): Promise<IAddress[]> => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("address")
      .select("*")
      .eq("user_id", user.id);

    if (error) throw error;
    return data as IAddress[];
  },

  addAddress: async (
    address: Omit<IAddress, "id" | "user_id">,
  ): Promise<IAddress> => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("address")
      .insert({ ...address, user_id: user.id })
      .single();

    if (error) throw error;
    return data as IAddress;
  },

  updateAddress: async (
    updatedAddress: Partial<IAddress>,
  ): Promise<IAddress> => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("address")
      .update(updatedAddress)
      .eq("id", updatedAddress.id)
      .eq("user_id", user.id)
      .single();

    if (error) throw error;
    return data as IAddress;
  },

  deleteAddress: async (addressId: string): Promise<void> => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("address")
      .delete()
      .eq("id", addressId)
      .eq("user_id", user.id);

    if (error) throw error;
  },

  createEmptyProfile: async (userId: string): Promise<IProfile> => {
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
    return data as IProfile;
  },
};
