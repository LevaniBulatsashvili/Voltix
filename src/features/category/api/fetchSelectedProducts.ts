import { supabase } from "../../../lib/supabase";
import type { ICategory, IProduct } from "../../../types/product";

const fetchSelectedProducts = async (
  category: ICategory | null,
): Promise<IProduct[]> => {
  if (!category) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category.id)
    .order("created_at", { ascending: false });

  if (error) new Error("products couldn't be fetched");
  return data || [];
};

export default fetchSelectedProducts;
