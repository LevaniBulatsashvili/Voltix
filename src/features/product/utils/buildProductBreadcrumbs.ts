import type { TFunction } from "i18next";
import type { IProduct } from "../../../types/product";
import type { ICrumb } from "../../../types/crumbs";
import { PAGE } from "../../../pages/pageConfig";

export const buildProductBreadcrumbs = (
  product: IProduct,
  t: TFunction,
): ICrumb[] => {
  return [
    {
      label: t("product.home"),
      to: PAGE.BASE,
    },
    {
      label: t(`product.${product.main_category.name.toLowerCase()}`),
      to: `${PAGE.CATEGORIES}/${product.main_category.name}`,
    },
    {
      label: t(`product.${product.category.name.toLowerCase()}`),
      to: `${PAGE.CATEGORIES}/${product.main_category.name}/${product.category.name}`,
    },
    {
      label: product.name,
    },
  ];
};
