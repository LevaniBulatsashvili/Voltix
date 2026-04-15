import type { TFunction } from "i18next";
import type { IProduct } from "@/types/public/product";
import type { ICrumb } from "@/types/common/crumbs";
import { PAGE } from "@/pages/pageConfig";
import { buildCategoryLink } from "../../products/utils/buildCategoryLink";

export const buildProductBreadcrumbs = (
  product: IProduct,
  t: TFunction,
): ICrumb[] => {
  return [
    {
      label: t("common.home"),
      to: PAGE.PUBLIC.BASE,
    },
    {
      label: t(`common.${product.main_category.name.toLowerCase()}`),
      to: buildCategoryLink(product.main_category.name.toLowerCase()),
    },
    {
      label: t(`common.${product.category.name.toLowerCase()}`),
      to: buildCategoryLink(product.category.name.toLowerCase()),
    },
    {
      label: product.name,
    },
  ];
};
