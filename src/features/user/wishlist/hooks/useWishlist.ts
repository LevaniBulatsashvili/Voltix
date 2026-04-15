import { useWishlistedIds } from "./useFetchWishlistIds";
import { useToggleWishlist } from "./useToggleWishlist";

export function useWishlist() {
  const { wishlistedIds, wishlistIdByProductId } = useWishlistedIds();
  const toggle = useToggleWishlist();

  const isLiked = (productId: number) => wishlistedIds.has(productId);

  const getWishlistId = (productId: number) =>
    wishlistIdByProductId.get(productId);

  const toggleWishlist = (productId: number) =>
    toggle.toggleWishlist({
      productId,
      isLiked: wishlistedIds.has(productId),
      wishlistId: wishlistIdByProductId.get(productId),
    });

  return {
    isLiked,
    getWishlistId,
    toggleWishlist,
  };
}
