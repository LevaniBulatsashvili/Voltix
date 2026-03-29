import { useQuery } from "@tanstack/react-query";
import type { ICategory } from "../../../types/product";
import Query_Keys from "../../../react-query/query-keys";
import fetchSelectedProducts, {
  type IProductsResponse,
  type ISortBy,
} from "../api/fetchSelectedProducts";
import { notifyError } from "../../../lib/toast/notifyError";

const useFetchSelectedProducts = (
  category: ICategory | null,
  page: number = 1,
  limit: number = 9,
  sortBy?: ISortBy,
  min?: number,
  max?: number,
) => {
  return useQuery<IProductsResponse>({
    queryKey: [
      Query_Keys.getSelectedProducts,
      category?.id,
      page,
      limit,
      sortBy,
      min,
      max,
    ],
    queryFn: async () => {
      try {
        return await fetchSelectedProducts(
          category,
          page,
          limit,
          sortBy,
          min,
          max,
        );
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        notifyError(message, true);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 30,
  });
};

export default useFetchSelectedProducts;
