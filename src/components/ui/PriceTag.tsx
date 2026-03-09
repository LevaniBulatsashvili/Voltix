import calculateDiscount from "../../features/products/utils/calculateDiscount";
import getCurrencySymbol from "../../features/products/utils/getCurrencySymbol";

interface IPriceTag {
  price: number;
  discount?: number;
  currency: string;
  textColor?: string;
}

const PriceTag = ({
  price,
  discount,
  currency,
  textColor = "primary",
}: IPriceTag) => {
  const symbol = getCurrencySymbol(currency);
  if (!discount)
    return (
      <span className="text-2xl font-bold">
        {symbol}
        {price}
      </span>
    );

  return (
    <span className={`flex items-baseline gap-2 text-${textColor}`}>
      <span className="text-2xl font-bold ">
        {symbol}
        {calculateDiscount(price, discount)}
      </span>

      <span className="line-through text-lg opacity-80">
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
