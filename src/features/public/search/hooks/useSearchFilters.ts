import { useCallback, useState } from "react";

export const useSearchFilters = (
  initial?: Partial<{
    minPrice: number;
    maxPrice: number;
    rating: number;
    hasDiscount: boolean;
  }>,
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

  const handlePriceChange = useCallback((min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max === 5000 ? undefined : max);
  }, []);

  const handleRatingChange = useCallback((value?: number) => {
    setRating(value);
  }, []);

  const handleHasDiscountChange = useCallback((value: boolean) => {
    setHasDiscount(value);
  }, []);

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
