import type { ILikeBtnOptions } from "@/components/button/LikeBtn";

interface IGetLikeOptions {
  userId?: string;
  productId: number;
  isLiked: (productId: number) => boolean;
  toggleWishlist: (productId: number) => void;
  getWishlistId?: (productId: number) => number;
}

export const getLikeOptions = ({
  userId,
  productId,
  isLiked,
  toggleWishlist,
  getWishlistId,
}: IGetLikeOptions) => {
  if (!userId) return undefined;
  const likeOptions: ILikeBtnOptions = {
    isLiked: isLiked(productId),
    onLike: () => toggleWishlist(productId),
  };
  if (getWishlistId) likeOptions.wishlistId = getWishlistId(productId);

  return likeOptions;
};
