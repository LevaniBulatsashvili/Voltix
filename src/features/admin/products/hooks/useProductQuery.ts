import { useFetchProducts } from "@/features/public/product/hooks/productCRUD";
import { useAdminQuery } from "../../hooks/useAdminQuery";
import type { IProduct } from "@/types/public/product";

export const useProductQuery = () => {
  const result = useAdminQuery<IProduct>({
    useQuery: useFetchProducts,
    selectField: `
      id, name, description, price, price_final, discount_percentage,
      stock, thumbnail, rating_avg, rating_count, total_sold,
      brand_id, main_category_id, category_id,
      brand:brand_id(name), main_category:main_category_id(name),
      category:category_id(name), product_images(image_url)
    `,
  });

  return {
    ...result,
    products: result.data,
    productList: result.list,
    productsQuery: result.query,
  };
};
