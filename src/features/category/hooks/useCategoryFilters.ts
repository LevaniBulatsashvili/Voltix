import { useState } from "react";
import type { ISpecs } from "../../../types/product";

export const useCategoryFilters = (
  initial?: Partial<{
    minPrice: number;
    maxPrice: number;
    rating: number;
    hasDiscount: boolean;
    brands: number[];
    specs: ISpecs[];
  }>,
  resetPage?: () => void,
) => {
  const [minPrice, setMinPrice] = useState<number | undefined>(
    initial?.minPrice,
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    initial?.maxPrice,
  );
  const [rating, setRating] = useState<number | undefined>(initial?.rating);
  const [hasDiscount, setHasDiscount] = useState<boolean | undefined>(
    initial?.hasDiscount,
  );
  const [brands, setBrands] = useState<number[]>(initial?.brands || []);
  const [specs, setSpecs] = useState<ISpecs[]>(initial?.specs || []);

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max === 5000 ? undefined : max);
    resetPage?.();
  };

  const handleRatingChange = (value?: number) => {
    setRating(value);
    resetPage?.();
  };

  const handleHasDiscountChange = (value: boolean) => {
    setHasDiscount(value);
    resetPage?.();
  };

  const handleBrandsChange = (selected: number[]) => {
    setBrands(selected);
    resetPage?.();
  };

  const handleSpecsChange = (selected: ISpecs[]) => {
    setSpecs(selected);
    resetPage?.();
  };

  return {
    minPrice,
    maxPrice,
    rating,
    hasDiscount,
    brands,
    specs,

    handlePriceChange,
    handleRatingChange,
    handleHasDiscountChange,
    handleBrandsChange,
    handleSpecsChange,
  };
};
