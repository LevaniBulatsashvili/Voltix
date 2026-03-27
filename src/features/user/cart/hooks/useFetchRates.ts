import { useQuery } from "@tanstack/react-query";
import type { IRates } from "../api/fetchRates";
import Query_Keys from "../../../../react-query/query-keys";
import fetchRates from "../api/fetchRates";

const useFetchRates = () => {
  return useQuery<IRates>({
    queryKey: [Query_Keys.getCurrencyRates, "USD"],
    queryFn: () => fetchRates(),
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 30,
  });
};
export default useFetchRates;
