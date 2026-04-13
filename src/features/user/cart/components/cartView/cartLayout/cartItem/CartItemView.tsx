import CartInfo from "./CartItemInfo";
import CartItemActions from "./CartItemActions";
import type { TFunction } from "i18next";
import type { IProduct } from "@/types/product";

interface ICartItemViewProps {
  t: TFunction;
  product: IProduct;
  quantity: number;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItemView = ({
  t,
  product,
  quantity,
  onRemove,
  onIncrease,
  onDecrease,
}: ICartItemViewProps) => {
  return (
    <div className="space-y-4 sm:flex gap-4 py-5 bg-backgound text-primary">
      <div className="flex gap-4">
        <div className="size-24 sm:size-32 shrink-0">
          <img
            src={"https://placehold.co/100x100?text=Product"}
            alt={t("cart.product")}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 min-w-0 grid grid-cols-1 gap-5 sm:gap-0 sm:grid-cols-[5fr_2fr]">
          <CartInfo product={product} />
        </div>
      </div>

      <div className="flex-none sm:flex-1">
        <CartItemActions
          onRemove={onRemove}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          quantity={quantity}
          maxQuantity={product.stock}
        />
      </div>
    </div>
  );
};

export default CartItemView;
