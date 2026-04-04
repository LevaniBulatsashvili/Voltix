import { useQuery } from "@tanstack/react-query";
import Query_Keys from "../../../react-query/query-keys";
import {
  fetchProducts,
  type IFetchProductsOptions,
  type IProductResponse,
} from "../api/fetchPoducts";
import type { IProduct } from "../../../types/product";

const useFetchProducts = (options: IFetchProductsOptions) => {
  return useQuery<IProductResponse, Error, IProduct[]>({
    queryKey: [Query_Keys.getProduct, options],
    queryFn: () => fetchProducts(options),
    select: ({ data }) => data,
  });
};

export default useFetchProducts;
