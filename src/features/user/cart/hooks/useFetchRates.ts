import { useQuery } from "@tanstack/react-query";
import type { RatesResponse } from "../api/fetchRates";
import Query_Keys from "../../../../react-query/query-keys";
import fetchRates from "../api/fetchRates";

const useFetchRates = (from: string = "USD", to: string = "GEL") => {
  return useQuery<RatesResponse>({
    queryKey: [Query_Keys.getCurrencyRates],
    queryFn: () => fetchRates(from, to),
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 30,
  });
};
export default useFetchRates;
