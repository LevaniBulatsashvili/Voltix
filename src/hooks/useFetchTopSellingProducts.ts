import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "../types/product";
import Query_Keys from "../react-query/query-keys";
import fetchTopSellingProducts from "../api/fetchTopSellingProducts";
import { notifyError } from "../lib/toast/notifyError";

const useFetchTopSellingProducts = (limit?: number) => {
  return useQuery<IProduct[]>({
    queryKey: [Query_Keys.getTopSellingProducts, limit],
    queryFn: async () => {
      try {
        return await fetchTopSellingProducts(limit);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        notifyError(message, true);
        throw error;
      }
    },
    enabled: limit !== 0,
  });
};

export default useFetchTopSellingProducts;
