import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "../types/product";
import Query_Keys from "../react-query/query-keys";
import fetchNewestProducts from "../api/fetchNewestProducts";
import { notifyError } from "../lib/toast/notifyError";

const useFetchNewestProducts = (limit?: number) => {
  return useQuery<IProduct[]>({
    queryKey: [Query_Keys.getNewestProducts, limit],
    queryFn: async () => {
      try {
        return await fetchNewestProducts(limit);
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

export default useFetchNewestProducts;
