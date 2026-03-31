import type { ICategory, IProduct, ISpecs } from "../../../types/product";
import { getRange } from "../../../utils/pagination";
import { buildProductsQuery } from "../utils/BuildProductQuery";
import { filterProductsBySpecs } from "./specFilter";

export interface IProductsResponse {
  products: IProduct[];
  totalPages: number;
  totalCount: number;
}

export type ISortBy = "popular" | "newest";

const fetchSelectedProducts = async (
  category: ICategory | null,
  page: number = 1,
  limit: number = 9,
  sortBy?: ISortBy,
  minPrice?: number,
  maxPrice?: number,
  rating?: number,
  hasDiscount?: boolean,
  selectedBrands?: number[],
  productSpecs?: ISpecs[],
): Promise<IProductsResponse> => {
  if (!category) return { products: [], totalPages: 0, totalCount: 0 };

  const { from, to } = getRange(page, limit);

  const filteredProductIds = await filterProductsBySpecs(productSpecs || []);

  const query = buildProductsQuery({
    category,
    minPrice,
    maxPrice,
    rating,
    hasDiscount,
    selectedBrands,
    filteredProductIds,
    sortBy,
  });
  if (!query) return { products: [], totalPages: 0, totalCount: 0 };

  const { data, error, count } = await query.range(from, to);
  if (error) throw new Error("products couldn't be fetched");

  return {
    products: data || [],
    totalPages: Math.ceil((count || 0) / limit),
    totalCount: count || 0,
  };
};

export default fetchSelectedProducts;
