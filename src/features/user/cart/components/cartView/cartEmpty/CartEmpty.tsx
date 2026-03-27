import { ShoppingCart } from "lucide-react";
import type { TFunction } from "i18next";

interface ICartEmptyProps {
  t: TFunction;
}

const CartEmpty = ({ t }: ICartEmptyProps) => {
  return (
    <div className="flex flex-col items-center pt-[18dvh] gap-6 min-h-[65vh] border rounded-xl">
      <ShoppingCart size={48} className="text-gray-400" />

      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-center">
          {t("cart.your_cart_is_empty")}
        </h2>

        <p className="opacity-80 text-lg text-center max-w-xs mx-auto">
          {t("cart.looks_like_you_haven't_added_any_products_to_your_cart_yet")}
        </p>
      </div>
    </div>
  );
};

export default CartEmpty;
