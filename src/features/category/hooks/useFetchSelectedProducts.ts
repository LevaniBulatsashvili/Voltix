import { useQuery } from "@tanstack/react-query";
import type { IBrand, ICategory } from "../../../types/product";
import Query_Keys from "../../../react-query/query-keys";
import fetchSelectedProducts, {
  type IProductsResponse,
  type ISortBy,
} from "../api/fetchSelectedProducts";
import { notifyError } from "../../../lib/toast/notifyError";

interface IUseFetchSelectedProducts {
  category: ICategory | null;
  brand: IBrand | null;
  page?: number;
  limit?: number;
  sortBy?: ISortBy;
  min?: number;
  max?: number;
  rating?: number;
  hasDiscount?: boolean;
}

const useFetchSelectedProducts = ({
  category,
  brand,
  page = 1,
  limit = 9,
  sortBy,
  min,
  max,
  rating,
  hasDiscount,
}: IUseFetchSelectedProducts) => {
  return useQuery<IProductsResponse>({
    queryKey: [
      Query_Keys.getSelectedProducts,
      category?.id,
      brand?.id,
      page,
      limit,
      sortBy,
      min,
      max,
      rating,
      hasDiscount,
    ],
    queryFn: async () => {
      try {
        return await fetchSelectedProducts(
          category,
          brand,
          page,
          limit,
          sortBy,
          min,
          max,
          rating,
          hasDiscount,
        );
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

export default useFetchSelectedProducts;
