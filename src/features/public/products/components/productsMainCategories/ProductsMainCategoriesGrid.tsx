import type { IMainCategory } from "@/types/public/product";
import { buildCategoryLink } from "../../utils/buildCategoryLink";
import ProductsMainCategoryCard from "./ProductsMainCategoryCard";
import { useTranslation } from "react-i18next";

interface IProductsMainCategoriesGrid {
  mainCategories: IMainCategory[];
}

const spanPattern = [
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
];

const ProductsMainCategoriesGrid = ({
  mainCategories,
}: IProductsMainCategoriesGrid) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-5 gap-5">
      {mainCategories.map(({ id, name, thumbnail }, index) => {
        const isLast = index === mainCategories.length - 1;
        const isOdd = mainCategories.length % 2 !== 0;

        const colSpan =
          isLast && isOdd
            ? "lg:col-span-5"
            : spanPattern[index % spanPattern.length];

        return (
          <div key={id} className={`col-span-5 ${colSpan}`}>
            <ProductsMainCategoryCard
              to={buildCategoryLink(name.toLowerCase())}
              title={t(`common.${name.toLowerCase()}`)}
              image={thumbnail}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsMainCategoriesGrid;
