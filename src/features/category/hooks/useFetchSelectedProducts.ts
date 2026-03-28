import { useQuery } from "@tanstack/react-query";
import type { ICategory, IProduct } from "../../../types/product";
import Query_Keys from "../../../react-query/query-keys";
import fetchSelectedProducts from "../api/fetchSelectedProducts";
import { notifyError } from "../../../lib/toast/notifyError";

const useFetchSelectedProducts = (category: ICategory | null) => {
  return useQuery<IProduct[]>({
    queryKey: [Query_Keys.getSelectedProducts, category],
    queryFn: async () => {
      try {
        return await fetchSelectedProducts(category);
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
