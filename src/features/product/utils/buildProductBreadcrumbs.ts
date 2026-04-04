import type { TFunction } from "i18next";
import type { IProduct } from "../../../types/product";
import type { ICrumb } from "../../../types/common/crumbs";
import { PAGE } from "../../../pages/pageConfig";

export const buildProductBreadcrumbs = (
  product: IProduct,
  t: TFunction,
): ICrumb[] => {
  return [
    {
      label: t("common.home"),
      to: PAGE.BASE,
    },
    {
      label: t(`common.${product.main_category.name.toLowerCase()}`),
      to: `${PAGE.CATEGORY}/${product.main_category.name}`,
    },
    {
      label: t(`common.${product.category.name.toLowerCase()}`),
      to: `${PAGE.CATEGORY}/${product.main_category.name}/${product.category.name}`,
    },
    {
      label: product.name,
    },
  ];
};
