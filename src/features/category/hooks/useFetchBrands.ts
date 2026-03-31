import { useQuery } from "@tanstack/react-query";
import type { IBrand } from "../../../types/product";
import Query_Keys from "../../../react-query/query-keys";
import { notifyError } from "../../../lib/toast/notifyError";
import fetchBrands from "../api/fetchBrands";

const useFetchBrands = () => {
  return useQuery<IBrand[]>({
    queryKey: [Query_Keys.getBrands],
    queryFn: async () => {
      try {
        return await fetchBrands();
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

export default useFetchBrands;
