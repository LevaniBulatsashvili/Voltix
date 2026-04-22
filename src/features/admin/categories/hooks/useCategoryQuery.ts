import { useFetchCategories } from "@/features/public/category/hooks/categoryCRUD";
import { useAdminQuery } from "../../hooks/useAdminQuery";
import type { ICategory } from "@/types/public/product";

export const useCategoryQuery = () => {
  const result = useAdminQuery<ICategory>({
    useQuery: useFetchCategories,
    selectField: "*, main_category:main_category_id(name)",
  });

  return {
    ...result,
    categoryList: result.list,
    categoriesQuery: result.query,
  };
};
