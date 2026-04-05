import { useQuery } from "@tanstack/react-query";
import type { IRates } from "../features/user/cart/api/fetchRates";
import { Query_Keys } from "../lib/react-query/configs";
import fetchRates from "../features/user/cart/api/fetchRates";

const useFetchRates = () => {
  return useQuery<IRates>({
    queryKey: [Query_Keys.getCurrencyRates, "USD"],
    queryFn: () => fetchRates(),
  });
};

export default useFetchRates;
