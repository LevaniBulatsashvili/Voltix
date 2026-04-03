import { supabase } from "../lib/supabase";
import type { IProductComment } from "../types/product";

export const fetchProductComments = async (
  offset = 0,
  limit = 3,
): Promise<{ comments: IProductComment[]; total: number }> => {
  const { data, count, error } = await supabase
    .from("product_comments")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw new Error("comments_could_not_be_fetched");

  return {
    comments: data as IProductComment[],
    total: count ?? 0,
  };
};
