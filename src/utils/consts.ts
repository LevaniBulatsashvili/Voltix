import type { TCategoryQueries } from "@/features/public/category/utils/categoryQueryMap";

export const CATEGORIES = [
  "electronics",
  "cameras",
  "gaming",
  "headphones",
  "laptops",
  "smartphones",
  "tablets",
  "tvs",
  "wearables",
  "over-ear",
  "in-ear",
  "gaming headsets",
  "sports headphones",
  "studio headphones",
  "consoles",
  "gaming accessories",
  "vr headsets",
  "pc gaming",
  "gaming chairs",
  "dslr",
  "mirrorless",
  "action cameras",
  "lenses",
  "camera accessories",
] as const;

export const MAINCATEGORIES = [
  "electronics",
  "cameras",
  "gaming",
  "headphones",
] as const;

export const NAME_OVERRIDES: Partial<Record<TCategoryQueries, string>> = {
  "in-ear": "In-Ear",
  "over-ear": "Over-Ear",
};

export const createCategoryQuery = (slug: string): string =>
  NAME_OVERRIDES[slug as TCategoryQueries] ??
  slug
    .split(" ")
    .map((w) => w.charAt(0).toLowerCase() + w.slice(1))
    .join("-");

export const PRODUCTSELECTFIELD = `id, name, price, rating_avg, discount_percentage, thumbnail,
                                main_category: main_categories(name),
                                category: categories(name)`;
