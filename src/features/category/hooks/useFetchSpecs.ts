import { useQuery } from "@tanstack/react-query";
import type { ISpecs } from "../../../types/product";
import Query_Keys from "../../../react-query/query-keys";
import { notifyError } from "../../../lib/toast/notifyError";
import fetchSpecs from "../api/fetchSpecs";

const useFetchSpecs = () => {
  return useQuery<ISpecs[]>({
    queryKey: [Query_Keys.getSpecs],
    queryFn: async () => {
      try {
        return await fetchSpecs();
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

export default useFetchSpecs;
