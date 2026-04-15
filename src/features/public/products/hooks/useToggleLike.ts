import { useState } from "react";
import type { IProductCard } from "../components/productsShowcase/ProductCard";

export function useToggleLike(onToggleLike: IProductCard["onToggleLike"]) {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleLike = (
    e: React.MouseEvent,
    productId: number,
    isLiked: boolean,
    wishlistId?: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDisabled) return;

    setIsDisabled(true);
    onToggleLike({ productId, isLiked, wishlistId });
    setTimeout(() => setIsDisabled(false), 1000);
  };

  return { handleLike, isDisabled };
}
