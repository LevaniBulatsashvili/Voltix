import { supabase } from "../../../lib/supabase";
import type {
  IDataResponse,
  IPaginationOptions,
} from "../../../types/common/api";
import type { IProductComment } from "../../../types/product";
import { getRange } from "../../../utils/pagination";

export type TCommentSortOrder = "newest" | "oldest";
export interface IFetchProductCommentsOptions extends IPaginationOptions {
  productId?: number;
  sortOrder?: TCommentSortOrder;
}
export type IProductCommentsResponse = IDataResponse<IProductComment>;

export const fetchProductComments = async ({
  page = 1,
  limit = 3,
  productId,
  sortOrder = "newest",
}: IFetchProductCommentsOptions): Promise<IProductCommentsResponse> => {
  const { from, to } = getRange(page, limit);
  let query = supabase.from("product_comments").select("*", { count: "exact" });

  query = query.order("created_at", {
    ascending: sortOrder === "oldest",
  });

  if (productId) query = query.eq("product_id", productId);

  const { data, count, error } = await query.range(from, to);

  if (error) throw new Error("comments_could_not_be_fetched");

  return {
    data,
    total: count ?? 0,
  };
};
