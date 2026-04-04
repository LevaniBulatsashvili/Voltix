import { useQuery } from "@tanstack/react-query";
import type { IRates } from "../api/fetchRates";
import Query_Keys from "../../../../react-query/query-keys";
import fetchRates from "../api/fetchRates";

const useFetchRates = () => {
  return useQuery<IRates>({
    queryKey: [Query_Keys.getCurrencyRates, "USD"],
    queryFn: () => fetchRates(),
  });
};

export default useFetchRates;
