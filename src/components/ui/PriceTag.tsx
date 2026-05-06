import { cn } from "@/utils/cn";
import { usePrice } from "@/features/user/cart/hooks/usePrice";
import calculateDiscount from "@/utils/calculateDiscount";
import { memo } from "react";

interface IPriceTag {
  price: number;
  discount?: number;
  className?: string;
}

const PriceTag = ({ price, discount, className }: IPriceTag) => {
  const { format } = usePrice();

  if (!discount)
    return (
      <span className={cn("text-2xl font-bold text-black", className)}>
        {format(price, true)}
      </span>
    );

  return (
    <span
      className={cn(
        "flex items-center gap-2 text-black overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent",
        className,
      )}
    >
      <span className="text-2xl font-bold">
        {format(calculateDiscount(price, discount), true)}
      </span>
      <span className="line-through text-lg opacity-80 hidden sm:block">
        {format(price, true)}
      </span>
      <span className="ml-1 sm:ml-2 px-3 py-1 bg-linear-to-r from-red-400 to-red-600 text-white font-semibold rounded-full text-sm">
        -{discount}%
      </span>
    </span>
  );
};

export default memo(PriceTag);
