import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "../../../types/product";
import {Query_Keys} from "../../../lib/react-query/configs";
import fetchProduct from "../api/fetchProduct";

const useFetchProduct = (productId: string) => {
  return useQuery<IProduct>({
    queryKey: [Query_Keys.getProduct, productId],
    queryFn: () => fetchProduct(productId),
    enabled: !!productId,
  });
};

export default useFetchProduct;
