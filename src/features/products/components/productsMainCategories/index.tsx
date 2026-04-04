import { useTranslation } from "react-i18next";
import { useFetchMainCategories } from "../../../../hooks/useFetchMainCategories";
import AsyncBoundary from "../../../../components/feedback/AsyncBoundary";
import MainCategoriesGrid from "./ProductsMainCategoriesGrid";
import ProductsMainCategoriesSkeleton from "../productsSkeleton/ProductsMainCategoriesSkeleton";

const ProductsMainCategories = () => {
  const { t } = useTranslation();
  const {
    data: mainCategoriesData,
    isLoading: mainCategoriesLoading,
    error: mainCategoriesError,
  } = useFetchMainCategories();

  return (
    <div className="mb-14 sm:mb-20 w-[90%] mx-auto rounded-4xl p-16 bg-white">
      <h2 className="mb-10 sm:mb-16 text-4xl sm:text-5xl font-extrabold uppercase text-center text-black">
        {t("products.browse_by_category")}
      </h2>

      <AsyncBoundary
        data={mainCategoriesData}
        isLoading={mainCategoriesLoading}
        error={mainCategoriesError}
        loadingFallback={<ProductsMainCategoriesSkeleton />}
        defaultFallbackOptions={{ className: "h-145 w-full" }}
      >
        {(mainCategories) => (
          <MainCategoriesGrid t={t} mainCategories={mainCategories} />
        )}
      </AsyncBoundary>
    </div>
  );
};

export default ProductsMainCategories;
