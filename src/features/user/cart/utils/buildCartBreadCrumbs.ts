import type { TFunction } from "i18next";
import type { ICrumb } from "../../../../types/Crumbs";
import { PAGE } from "../../../../pages/pageConfig";

export const buildCartBreadcrumbs = (t: TFunction): ICrumb[] => {
  return [
    {
      label: t("cart.home"),
      to: PAGE.BASE,
    },
    {
      label: t(`cart.cart`),
    },
  ];
};
