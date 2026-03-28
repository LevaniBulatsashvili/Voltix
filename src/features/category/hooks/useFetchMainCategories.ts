import { useQuery } from "@tanstack/react-query";
import type { IMainCategory } from "../../../types/product";
import Query_Keys from "../../../react-query/query-keys";
import fetchMainCategories from "../api/fetchMainCategories";
import { notifyError } from "../../../lib/toast/notifyError";

const useFetchMainCategories = () => {
  return useQuery<IMainCategory[]>({
    queryKey: [Query_Keys.getMainCategories],
    queryFn: async () => {
      try {
        return await fetchMainCategories();
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

export default useFetchMainCategories;
