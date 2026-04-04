import { useQuery } from "@tanstack/react-query";
import type { IBrand } from "../../../types/product";
import Query_Keys from "../../../react-query/query-keys";
import fetchBrands from "../api/fetchBrands";

const useFetchBrands = () => {
  return useQuery<IBrand[]>({
    queryKey: [Query_Keys.getBrands],
    queryFn: fetchBrands,
  });
};

export default useFetchBrands;
