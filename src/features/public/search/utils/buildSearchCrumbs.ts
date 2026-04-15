import type { TFunction } from "i18next";
import type { ICrumb } from "@/types/common/crumbs";
import { PAGE } from "@/pages/pageConfig";
import type { ICategory } from "@/types/public/product";

export const buildSearchCrumbs = (
  t: TFunction,
  category?: ICategory["name"],
): ICrumb[] => {
  return [
    {
      label: t("common.home"),
      to: PAGE.PUBLIC.BASE,
    },
    {
      label: t(`common.${category ? category : "search"}`),
    },
  ];
};
