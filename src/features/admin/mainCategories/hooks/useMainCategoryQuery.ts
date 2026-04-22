import { useAdminQuery } from "../../hooks/useAdminQuery";
import { useFetchMainCategories } from "@/features/public/category/hooks/mainCategoryCRUD";
import type { IMainCategory } from "@/types/public/product";

export const useMainCategoryQuery = () => {
  const result = useAdminQuery<IMainCategory>({
    useQuery: useFetchMainCategories,
    selectField: "id, name, thumbnail",
  });

  return {
    ...result,
    mainCategoriesQuery: result.query,
    mainCategoryList: result.list,
  };
};
