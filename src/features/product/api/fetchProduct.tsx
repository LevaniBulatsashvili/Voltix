import { supabase } from "../../../lib/supabase";
import type { IProduct } from "../../../types/Product";

const fetchProduct = async (id: string): Promise<IProduct> => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      main_category_id(id, name),
      category_id(id, name),
      product_images(image),
      product_specs(key, value)
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as IProduct;
};

export default fetchProduct;
