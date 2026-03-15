import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "../types/Product";
import Query_Keys from "../react-query/query-keys";
import fetchTopSellingProducts from "../api/fetchTopSellingProducts";

const useFetchTopSellingProducts = (limit?: number) => {
  return useQuery<IProduct[]>({
    queryKey: [Query_Keys.getNewestProducts, limit],
    queryFn: () => fetchTopSellingProducts(limit),
    enabled: limit !== 0,
  });
};

export default useFetchTopSellingProducts;
