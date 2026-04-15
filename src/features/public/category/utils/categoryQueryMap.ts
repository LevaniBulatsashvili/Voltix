import type { IFilters } from "@/lib/supabase/createSupabaseService";
import type { IProduct } from "@/types/public/product";

export type TMainCategory =
  | "electronics"
  | "cameras"
  | "gaming"
  | "headphones"
  | "on-sale"
  | "new-arrivals"
  | "top-selling";

export interface IQueryOptions {
  filters?: IFilters<IProduct>;
  sort?: { field: keyof IProduct; ascending?: boolean }[];
}

const CATEGORY_QUERY_MAP: Record<TMainCategory, IQueryOptions> = {
  electronics: {
    filters: { eq: { main_category_id: 1 } },
  },

  headphones: {
    filters: { eq: { main_category_id: 2 } },
  },

  gaming: {
    filters: { eq: { main_category_id: 3 } },
  },

  cameras: {
    filters: { eq: { main_category_id: 4 } },
  },

  "on-sale": {
    filters: { gt: { discount_percentage: 0 } },
  },

  "new-arrivals": {
    sort: [{ field: "updated_at", ascending: false }],
  },

  "top-selling": {
    sort: [
      { field: "stock", ascending: false },
      { field: "id", ascending: true },
    ],
  },
};

export const getCategoryQueryOptions = (
  key?: TMainCategory,
): IQueryOptions | null => {
  if (!key) return null;
  return CATEGORY_QUERY_MAP[key] ?? null;
};
