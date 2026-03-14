import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "../types/Product";
import Query_Keys from "../react-query/query-keys";
import fetchNewestProducts from "../api/fetchNewestProducts";

const useFetchNewestProducts = (limit?: number) => {
  return useQuery<IProduct[]>({
    queryKey: [Query_Keys.getNewestProducts, limit],
    queryFn: () => fetchNewestProducts(limit),
    enabled: limit !== 0,
  });
};

export default useFetchNewestProducts;
