import { useQuery } from "@tanstack/react-query";
import type { IBrand, ICategory } from "../../../types/product";
import { Query_Keys } from "../../../lib/react-query/configs";
import fetchSelectedProducts, {
  type IProductsResponse,
  type ISortBy,
} from "../api/fetchSelectedProducts";

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
    queryFn: () =>
      fetchSelectedProducts(
        category,
        brand,
        page,
        limit,
        sortBy,
        min,
        max,
        rating,
        hasDiscount,
      ),
  });
};

export default useFetchSelectedProducts;
