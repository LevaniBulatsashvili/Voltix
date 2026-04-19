import { useFetchCategories } from "@/features/public/category/hooks/categoryCRUD";
import { useFetchMainCategories } from "@/features/public/category/hooks/mainCategoryCRUD";
import { useFetchBrands } from "@/features/public/search/hooks/brandCRUD";
import { useTranslation } from "react-i18next";

export const useProductFormOptions = (mainCategoryId?: number) => {
  const { t } = useTranslation();
  const { data: brandsData, isFetching: brandsFetching } = useFetchBrands({
    selectField: "id, name",
  });
  const { data: mainCategoriesData, isFetching: mainCategoriesFetching } =
    useFetchMainCategories({
      selectField: "id, name",
    });
  const { data: categoriesData, isFetching: categoriesFetching } =
    useFetchCategories({
      filters: mainCategoryId
        ? { eq: { main_category_id: mainCategoryId } }
        : undefined,
      selectField: "id, name",
    });

  return {
    brandOptions: (brandsData?.data ?? []).map((brand) => ({
      value: String(brand.id),
      label: t(`common.${brand.name.toLowerCase()}`),
    })),
    mainCategoryOptions: (mainCategoriesData?.data ?? []).map(
      (mainCategory) => ({
        value: String(mainCategory.id),
        label: t(`common.${mainCategory.name.toLowerCase()}`),
      }),
    ),
    categoryOptions: (categoriesData?.data ?? []).map((category) => ({
      value: String(category.id),
      label: t(`common.${category.name.toLowerCase()}`),
    })),
    brandsFetching,
    mainCategoriesFetching,
    categoriesFetching,
  };
};
