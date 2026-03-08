import calculateDiscount from "../utils/calculateDiscount";
import getCurrencySymbol from "../utils/getCurrencySymbol";

interface IPriceTag {
  price: number;
  discount?: number;
  currency: string;
}

const PriceTag = ({ price, discount, currency }: IPriceTag) => {
  const symbol = getCurrencySymbol(currency);
  if (!discount)
    return (
      <span className="text-2xl font-bold text-gray-900">
        {symbol}
        {price}
      </span>
    );

  return (
    <span className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-gray-900">
        {symbol}
        {calculateDiscount(price, discount)}
      </span>

      <span className="text-gray-400 line-through text-lg">
        {symbol}
        {price}
      </span>

      {discount && (
        <span className="ml-2 px-3 py-1 bg-linear-to-r from-red-400 to-red-600 text-white font-semibold rounded-full text-sm">
          -{discount}%
        </span>
      )}
    </span>
  );
};

export default PriceTag;
