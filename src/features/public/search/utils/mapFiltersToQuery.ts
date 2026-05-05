import type { IBrand, ICategory } from "@/types/public/product";

export interface ISearchFilterState {
  category: ICategory | null;
  brand: IBrand | null;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  rating: number | undefined;
  hasDiscount: boolean | undefined;
}

export const mapFiltersToQuery = (data: ISearchFilterState) => ({
  eq: {
    brand_id: data.brand?.id,
    category_id: data.category?.id,
  },
  gte: { price: data.minPrice, rating_avg: data.rating },
  lte: { price_final: data.maxPrice },
  gt: { discount_percentage: data.hasDiscount ? 0 : undefined },
});
