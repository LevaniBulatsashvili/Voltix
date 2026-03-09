import { PAGE } from "../../../pages/pageConfig";
import type { Crumb } from "../../../types/Crumbs";
import { capitalize } from "../../../utils/capitalize";

export const buildCrumbs = (searchParams: URLSearchParams): Crumb[] => {
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  const crumbs: Crumb[] = [
    { name: "Home", path: PAGE.BASE },
    { name: "Shop", path: PAGE.SHOP },
  ];

  if (category) {
    crumbs.push({
      name: capitalize(category),
      path: `${PAGE.SHOP}?category=${category}`,
    });
  }

  if (subcategory) {
    crumbs.push({ name: capitalize(subcategory) });
  }

  return crumbs;
};
