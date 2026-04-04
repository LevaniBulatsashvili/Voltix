import { supabase } from "../../../lib/supabase";
import type {
  IDataResponse,
  IPaginationOptions,
} from "../../../types/common/api";
import type { IProduct } from "../../../types/product";
import { getRange } from "../../../utils/pagination";
import { sortMap } from "../../../utils/sortMap";

export type TProductSortBy = "newest" | "topSelling";
export interface IFetchProductsOptions extends IPaginationOptions {
  sortBy?: TProductSortBy;
}
export type IProductResponse = IDataResponse<IProduct>;

export const fetchProducts = async ({
  page,
  limit,
  sortBy = "newest",
}: IFetchProductsOptions): Promise<IProductResponse> => {
  let query = supabase.from("products").select(
    `
      *,
      main_category:main_category_id(id, name),
      category:categories(name),
      brand:brands(id, name)
    `,
    { count: "exact" },
  );

  const { column, ascending } = sortMap[sortBy];
  query = query.order(column, { ascending: ascending });

  if (page && limit) {
    const { from, to } = getRange(page, limit);
    query = query.range(from, to);
  } else if (limit) query = query.limit(limit);

  const { data, count, error } = await query;

  if (error) throw new Error("products_could_not_be_fetched");

  return { data, total: count ?? 0 };
};
