import type { IProduct } from "../../../../types/Product";
import PriceTag from "../../../../components/ui/PriceTag";
import PlaceholderImg from "../../../../assets/images/Electronics.png";
import StarRating from "../../../../components/ui/StarRatings";
import AppLink from "../../../../components/button/AppLink";
import { PAGE } from "../../../../pages/pageConfig";

interface IProductCard {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCard) => (
  <AppLink
    to={PAGE.PRODUCTS}
    className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer w-70 mx-auto"
  >
    <div className="overflow-hidden rounded-lg">
      <img
        src={PlaceholderImg}
        alt={product.name}
        width={200}
        height={300}
        className="object-cover w-full h-75 transform hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="mt-3 space-y-2 text-start">
      <p className="font-semibold capitalize text-lg text-gray-800">
        {product.name}
      </p>

      <StarRating rating={product.rating} textColor="black" />

      <PriceTag
        price={product.price}
        discount={product.discountPercentage}
        currency={product.currency}
        textColor="black"
      />
    </div>
  </AppLink>
);

export default ProductCard;
