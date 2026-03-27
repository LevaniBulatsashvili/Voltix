import { supabase } from "../lib/supabase";
import type { IProduct } from "../types/product";

interface ICreateProductInput {
  product: Omit<IProduct, "id" | "created_at" | "updated_at" | "comment">;
}

export const createProduct = async ({ product }: ICreateProductInput) => {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) throw error;

  return data;
};
