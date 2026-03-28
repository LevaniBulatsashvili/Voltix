import type { TFunction } from "i18next";
import type { ICrumb } from "../../../types/crumbs";
import { PAGE } from "../../../pages/pageConfig";

export const buildCategoryBreadcrumbs = (t: TFunction): ICrumb[] => {
  return [
    {
      label: t("category.home"),
      to: PAGE.BASE,
    },
    {
      label: t("category.category"),
    },
  ];
};
