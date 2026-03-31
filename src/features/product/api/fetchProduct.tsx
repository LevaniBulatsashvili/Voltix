import { supabase } from "../../../lib/supabase";
import type { IProduct, IImage } from "../../../types/product";

const fetchProduct = async (id: string): Promise<IProduct> => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      main_category(id, name),
      category(id, name),
      brand:brands(id, name),
      product_images(image_url),
      product_specs(spec, value),
      product_comments(id, name, avatar, comment, rating, verified, created_at),
      product_faqs(id, question, answer)
    `,
    )
    .eq("id", id)
    .single();

  if (error || !data) throw error ?? new Error("Product not found");

  const sortImages = (img1: IImage, img2: IImage) => {
    if (img1.image_url === data.thumbnail) return -1;
    if (img2.image_url === data.thumbnail) return 1;
    return 0;
  };

  const product: IProduct = {
    ...data,
    product_images: data.product_images?.sort(sortImages),
  };

  return product;
};

export default fetchProduct;
