import { supabase } from "../../../lib/supabase";
import type { IProduct, IImage } from "../../../types/product";

const fetchProduct = async (id: string): Promise<IProduct> => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      main_category:main_category_id(id, name),
      category:categories(id, name),
      brand:brands(id, name),
      product_specs(id, spec, value),
      product_images(image_url),
      product_faqs(id, question, answer)
    `,
    )
    .eq("id", id)
    .single();

  if (error || !data) new Error("product_not_found");

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
