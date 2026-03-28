import { useQuery } from "@tanstack/react-query";
import type { IRates } from "../api/fetchRates";
import Query_Keys from "../../../../react-query/query-keys";
import fetchRates from "../api/fetchRates";
import { notifyError } from "../../../../lib/toast/notifyError";

const useFetchRates = () => {
  return useQuery<IRates>({
    queryKey: [Query_Keys.getCurrencyRates, "USD"],
    queryFn: async () => {
      try {
        return await fetchRates();
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

export default useFetchRates;
