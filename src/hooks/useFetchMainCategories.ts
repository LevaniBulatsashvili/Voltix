import { useQuery } from "@tanstack/react-query";
import type { IMainCategory } from "../types/product";
import { Query_Keys } from "../lib/react-query/configs";
import fetchMainCategories, {
  type IFetchMainCategoriesOptions,
} from "../features/category/api/fetchMainCategories";

export const useFetchMainCategories = (
  options?: IFetchMainCategoriesOptions,
) => {
  return useQuery<IMainCategory[]>({
    queryKey: [Query_Keys.getMainCategories, options],
    queryFn: () => fetchMainCategories(options),
  });
};
