import { PAGE } from "../../../pages/pageConfig";
import type { ICrumb } from "../../../types/Crumbs";

export const buildCrumbs = (searchParams: URLSearchParams): ICrumb[] => {
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  const crumbs: ICrumb[] = [
    { name: "home", path: PAGE.BASE },
    { name: "shop", path: PAGE.SHOP },
  ];

  if (category)
    crumbs.push({
      name: category,
      path: `${PAGE.SHOP}?category=${category}`,
    });

  if (subcategory) crumbs.push({ name: subcategory });

  return crumbs;
};
