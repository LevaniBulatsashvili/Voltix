import { useTranslation } from "react-i18next";
import MainCategoriesGrid from "./ProductsMainCategoriesGrid";
import ProductsMainCategoriesSkeleton from "../productsSkeleton/ProductsMainCategoriesSkeleton";
import { QueryBoundary } from "@/components/feedback/QueryBoundary";
import { useFetchMainCategories } from "../../../category/hooks/mainCategoryCRUD";
import { memo } from "react";

const ProductsMainCategories = () => {
  const { t } = useTranslation();
  const mainCategoriesQuery = useFetchMainCategories({
    selectField: "id, name, thumbnail",
  });

  return (
    <div className="mb-14 sm:mb-20 w-[90%] mx-auto rounded-4xl p-6 sm:p-10 md:p-13 lg:p-16 bg-white">
      <h2 className="mb-10 sm:mb-16 text-4xl sm:text-5xl font-extrabold uppercase text-center text-black">
        {t("products.browse_by_category")}
      </h2>

      <QueryBoundary
        query={mainCategoriesQuery}
        loadingFallback={<ProductsMainCategoriesSkeleton />}
        defaultFallbackOptions={{ className: "h-145 w-full" }}
      >
        {(mainCategories) => (
          <MainCategoriesGrid mainCategories={mainCategories} />
        )}
      </QueryBoundary>
    </div>
  );
};

export default memo(ProductsMainCategories);
