import { useQuery } from "@tanstack/react-query";
import type { ICategory, ISpecs } from "../../../types/product";
import Query_Keys from "../../../react-query/query-keys";
import fetchSelectedProducts, {
  type IProductsResponse,
  type ISortBy,
} from "../api/fetchSelectedProducts";
import { notifyError } from "../../../lib/toast/notifyError";

interface IUseFetchSelectedProducts {
  category: ICategory | null;
  page?: number;
  limit?: number;
  sortBy?: ISortBy;
  min?: number;
  max?: number;
  rating?: number;
  hasDiscount?: boolean;
  selectedBrands?: number[];
  productSpecs?: ISpecs[];
}

const useFetchSelectedProducts = ({
  category,
  page = 1,
  limit = 9,
  sortBy,
  min,
  max,
  rating,
  hasDiscount,
  selectedBrands,
  productSpecs,
}: IUseFetchSelectedProducts) => {
  return useQuery<IProductsResponse>({
    queryKey: [
      Query_Keys.getSelectedProducts,
      category?.id,
      page,
      limit,
      sortBy,
      min,
      max,
      rating,
      hasDiscount,
      selectedBrands ? JSON.stringify(selectedBrands) : null,
      productSpecs ? JSON.stringify(productSpecs) : null,
    ],
    queryFn: async () => {
      try {
        return await fetchSelectedProducts(
          category,
          page,
          limit,
          sortBy,
          min,
          max,
          rating,
          hasDiscount,
          selectedBrands,
          productSpecs,
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
