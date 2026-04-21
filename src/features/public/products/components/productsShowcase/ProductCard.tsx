import type { IProduct } from "@/types/public/product";
import PriceTag from "@/components/ui/PriceTag";
import StarRating from "@/components/ui/StarRatings";
import AppLink from "@/components/button/AppLink";
import { buildProductLink } from "../../../product/utils/buildProductLink";
import LikeBtn, { type ILikeBtnOptions } from "@/components/button/LikeBtn";

export interface IProductCard {
  product: IProduct;
  likeOptions?: ILikeBtnOptions;
}

const ProductCard = ({ product, likeOptions }: IProductCard) => {
  return (
    <AppLink
      to={buildProductLink(
        product.main_category.name.toLowerCase(),
        product.category.name.toLowerCase(),
        product.id,
      )}
      className="relative bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {likeOptions && (
        <LikeBtn isLiked={likeOptions.isLiked} onLike={likeOptions.onLike} />
      )}

      <div className="overflow-hidden rounded-lg">
        <img
          src={product.thumbnail || "/images/placeholders/product.webp"}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = "/images/placeholders/product.webp";
          }}
          className="object-contain w-full h-60 transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="mt-3 space-y-2 text-start">
        <p className="font-semibold capitalize text-lg text-gray-800">
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

export default ProductCard;
