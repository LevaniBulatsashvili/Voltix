import { useState } from "react";

export const useSearchFilters = (
  initial?: Partial<{
    minPrice: number;
    maxPrice: number;
    rating: number;
    hasDiscount: boolean;
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

  return {
    minPrice,
    maxPrice,
    rating,
    hasDiscount,

    handlePriceChange,
    handleRatingChange,
    handleHasDiscountChange,
  };
};
