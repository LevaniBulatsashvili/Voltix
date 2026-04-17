import type { IFilters } from "@/lib/supabase/createSupabaseService";
import type { IProduct } from "@/types/public/product";

export type TCategoryQueries =
  | "electronics"
  | "cameras"
  | "gaming"
  | "headphones"
  | "on-sale"
  | "new-arrivals"
  | "top-selling"
  | "laptops"
  | "smartphones"
  | "tablets"
  | "tvs"
  | "wearables"
  | "over-ear"
  | "in-ear"
  | "gaming-headsets"
  | "sports-headphones"
  | "studio-headphones"
  | "consoles"
  | "gaming-accessories"
  | "vr-headsets"
  | "pc-gaming"
  | "gaming-chairs"
  | "dslr"
  | "mirrorless"
  | "action-cameras"
  | "lenses"
  | "camera-accessories";

export interface IQueryOptions {
  filters?: IFilters<IProduct>;
  sort?: { field: keyof IProduct; ascending?: boolean }[];
}

const CATEGORY_QUERY_MAP: Record<TCategoryQueries, IQueryOptions> = {
  // ================= MAIN CATEGORIES =================
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

  // ================= ELECTRONICS SUBCATEGORIES =================
  laptops: {
    filters: { eq: { category_id: 1 } },
  },

  smartphones: {
    filters: { eq: { category_id: 2 } },
  },

  tablets: {
    filters: { eq: { category_id: 3 } },
  },

  tvs: {
    filters: { eq: { category_id: 4 } },
  },

  wearables: {
    filters: { eq: { category_id: 5 } },
  },

  "over-ear": {
    filters: { eq: { category_id: 6 } },
  },

  "in-ear": {
    filters: { eq: { category_id: 7 } },
  },

  "gaming-headsets": {
    filters: { eq: { category_id: 8 } },
  },

  "sports-headphones": {
    filters: { eq: { category_id: 9 } },
  },

  "studio-headphones": {
    filters: { eq: { category_id: 10 } },
  },

  consoles: {
    filters: { eq: { category_id: 11 } },
  },

  "gaming-accessories": {
    filters: { eq: { category_id: 12 } },
  },

  "pc-gaming": {
    filters: { eq: { category_id: 13 } },
  },

  "gaming-chairs": {
    filters: { eq: { category_id: 14 } },
  },

  "vr-headsets": {
    filters: { eq: { category_id: 15 } },
  },

  dslr: {
    filters: { eq: { category_id: 16 } },
  },

  mirrorless: {
    filters: { eq: { category_id: 17 } },
  },

  "action-cameras": {
    filters: { eq: { category_id: 18 } },
  },

  lenses: {
    filters: { eq: { category_id: 19 } },
  },

  "camera-accessories": {
    filters: { eq: { category_id: 29 } },
  },

  // ================= DYNAMIC FILTERS =================
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
  key?: TCategoryQueries,
): IQueryOptions | null => {
  if (!key) return null;
  return CATEGORY_QUERY_MAP[key] ?? null;
};
