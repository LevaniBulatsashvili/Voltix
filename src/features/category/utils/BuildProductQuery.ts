import { supabase } from "../../../lib/supabase";
import type { ICategory } from "../../../types/product";

interface IQueryOptions {
  category: ICategory;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  hasDiscount?: boolean;
  selectedBrands?: number[];
  filteredProductIds?: number[] | null;
  sortBy?: "popular" | "newest";
}

export const buildProductsQuery = (options: IQueryOptions) => {
  const {
    category,
    minPrice,
    maxPrice,
    rating,
    hasDiscount,
    selectedBrands,
    filteredProductIds,
    sortBy,
  } = options;

  let query = supabase
    .from("products")
    .select(
      `
        *,
        brands(id, name),
        product_images(*),
        product_specs(*),
        product_comments:comments(*)
      `,
      { count: "planned" },
    )
    .eq("category", category.id)
    .gt("stock", 0);

  if (filteredProductIds) {
    if (filteredProductIds.length === 0) return null;
    query = query.in("id", filteredProductIds);
  }

  if (minPrice !== undefined) query = query.gte("price_final", minPrice);
  if (maxPrice !== undefined) query = query.lte("price_final", maxPrice);
  if (rating !== undefined) query = query.gte("rating", rating);
  if (hasDiscount) query = query.gt("discount_percentage", 0);
  if (selectedBrands?.length) query = query.in("brand_id", selectedBrands);

  if (sortBy === "popular")
    query = query.order("total_sold", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  return query;
};
