import { supabase } from "../../../lib/supabase";
import type { IBrand, ICategory } from "../../../types/product";

interface IQueryOptions {
  category: ICategory | null;
  brand: IBrand | null;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  hasDiscount?: boolean;
  sortBy?: "popular" | "newest";
}

export const buildProductsQuery = (options: IQueryOptions) => {
  const { category, brand, minPrice, maxPrice, rating, hasDiscount, sortBy } =
    options;
  let query = supabase.from("products").select(
    `
        *,
        main_category:main_category_id(id, name),
        category:category_id(id, name)
      `,
    { count: "exact" },
  );

  if (category) query = query.eq("category_id", category.id);
  if (brand) query = query.eq("brand_id", brand.id);
  if (minPrice !== undefined) query = query.gte("price_final", minPrice);
  if (maxPrice !== undefined) query = query.lte("price_final", maxPrice);
  if (rating !== undefined) query = query.gte("rating_avg", rating);
  if (hasDiscount) query = query.gt("discount_percentage", 0);

  if (sortBy === "popular") {
    query = query
      .order("total_sold", {
        ascending: false,
      })
      .order("id", {
        ascending: false,
      });
  } else {
    query = query
      .order("created_at", {
        ascending: false,
      })
      .order("id", {
        ascending: false,
      });
  }

  return query;
};
