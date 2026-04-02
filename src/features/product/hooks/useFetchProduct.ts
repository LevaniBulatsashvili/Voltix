import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "../../../types/product";
import Query_Keys from "../../../react-query/query-keys";
import fetchProduct from "../api/fetchProduct";
import { notifyError } from "../../../lib/toast/notifyError";

const useFetchProduct = (productId: string) => {
  return useQuery<IProduct>({
    queryKey: [Query_Keys.getProduct, productId],
    queryFn: async () => {
      try {
        return await fetchProduct(productId);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        notifyError(message, true);
        throw error;
      }
    },
    enabled: !!productId,
  });
};

export default useFetchProduct;
