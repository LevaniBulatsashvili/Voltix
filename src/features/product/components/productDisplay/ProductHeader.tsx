import StarRating from "../../../../components/ui/StarRatings";
import PriceTag from "../../../../components/ui/PriceTag";

interface IProductHeader {
  name: string;
  rating: number;
  price: number;
  discount?: number;
}

const ProductHeader = ({ name, rating, price, discount }: IProductHeader) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold uppercase">{name}</h1>
      <StarRating rating={rating} />
      <PriceTag price={price} discount={discount} />
    </div>
  );
};

export default ProductHeader;
