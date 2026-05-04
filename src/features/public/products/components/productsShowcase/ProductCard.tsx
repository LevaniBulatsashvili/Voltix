import type { IProduct } from "@/types/public/product";
import PriceTag from "@/components/ui/PriceTag";
import StarRating from "@/components/ui/StarRatings";
import AppLink from "@/components/button/AppLink";
import { buildProductLink } from "../../../product/utils/buildProductLink";
import LikeBtn from "@/components/button/LikeBtn";
import { memo, useMemo, useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { shallowEqual } from "react-redux";
import { getLikeOptions } from "@/features/user/wishlist/utils/getLikeOptions";
import { useWishlistContext } from "@/features/user/wishlist/hooks/useWishlistContext";

export interface IProductCard {
  product: IProduct;
  className?: string;
}

const ProductCard = ({ product, className }: IProductCard) => {
  const [imgSrc, setImgSrc] = useState(
    product.thumbnail || "/images/placeholders/product.webp",
  );
  const profile = useAppSelector(
    (state) => state.profile.profile,
    shallowEqual,
  );
  const { isLiked, toggleWishlist } = useWishlistContext(); // ✅ shared instance

  const likeOptions = useMemo(
    () =>
      getLikeOptions({
        profileId: profile?.id,
        productId: product.id,
        isLiked,
        toggleWishlist,
      }),
    [profile?.id, product.id, isLiked, toggleWishlist],
  );

  return (
    <AppLink
      to={buildProductLink(
        product.main_category.name.toLowerCase(),
        product.category.name.toLowerCase(),
        product.id,
      )}
      className={`relative bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer ${className}`}
    >
      {likeOptions && (
        <LikeBtn isLiked={likeOptions.isLiked} onLike={likeOptions.onLike} />
      )}

      <div className="overflow-hidden rounded-lg">
        <img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={() => setImgSrc("/images/placeholders/product.webp")}
          className="object-contain w-full h-60 transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="mt-3 space-y-2 text-start">
        <p className="line-clamp-2 font-semibold capitalize text-lg text-gray-800">
          {product.name}
        </p>

        <StarRating rating={product.rating_avg} textColor="black" />

        <PriceTag
          price={product.price}
          discount={product.discount_percentage}
          textColor="black"
        />
      </div>
    </AppLink>
  );
};

export default memo(ProductCard);
