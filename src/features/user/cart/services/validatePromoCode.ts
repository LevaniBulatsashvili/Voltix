import { supabase } from "@/lib/supabase";
import type { IPromoCode } from "@/types/profile/promoCode";

export const validatePromoCode = async (code: string): Promise<IPromoCode> => {
  const { data, error } = await supabase
    .from("promo_codes")
    .select("*")
    .eq("code", code.trim().toUpperCase())
    .eq("is_active", true)
    .single();

  if (error || !data) throw new Error("cart.invalid_promo_code");

  if (data.expires_at && new Date(data.expires_at) < new Date())
    throw new Error("cart.promo_code_has_expired");

  return data;
};
