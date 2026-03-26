import { supabase } from "../../../../lib/supabase";

export const wishlistService = {
  getWishlist: async (userId: string) => {
    const { data, error } = await supabase
      .from("wishlist")
      .select("*, product:products(*)")
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  },

  addToWishlist: async (userId: string, productId: number) => {
    const { error } = await supabase.from("wishlist").insert({
      user_id: userId,
      product_id: productId,
    });

    if (error) throw error;
  },

  removeFromWishlist: async (userId: string, productId: number) => {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .match({ user_id: userId, product_id: productId });

    if (error) throw error;
  },
};
