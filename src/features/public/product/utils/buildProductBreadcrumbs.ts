import type { TFunction } from "i18next";
import type { IProduct } from "@/types/public/product";
import type { ICrumb } from "@/types/common/crumbs";
import { PAGE } from "@/pages/pageConfig";
import { buildCategoryLink } from "../../products/utils/buildCategoryLink";

export const buildProductBreadcrumbs = (
  product: IProduct,
  t: TFunction,
): ICrumb[] => {
  const mainCategory = product.main_category.name.toLowerCase();
  const category = product.category.name.toLowerCase();

  return [
    { label: t("common.home"), to: PAGE.PUBLIC.BASE },
    {
      label: t(`common.${mainCategory}`),
      to: buildCategoryLink(mainCategory.replace(/\s+/g, "-")),
    },
    {
      label: t(`common.${category}`),
      to: buildCategoryLink(category.replace(/\s+/g, "-")),
    },
    { label: product.name },
  ];
};
