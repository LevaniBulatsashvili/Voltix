import { useTranslation } from "react-i18next";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "../../../../hooks/redux";
import { useCartPricing } from "../hooks/useCartPricint";
import Breadcrumbs from "../../../../components/ui/BreadCrumbs";
import { buildCartBreadcrumbs } from "../utils/buildCartBreadCrumbs";
import CartItemSkeleton from "./cartSkeleton/CartItemSkeleton";
import CartOrderSummarySkeleton from "./cartSkeleton/CartOrderSummarySkeleton";
import CartItem from "./cartItem/CartItem";
import CartOrderSummary from "./cartOrderSummary/CartOrderSummary";
import { getCurrencyFromLang } from "../../../../utils/getCurrencyForLang";

const Cart = () => {
  const { t, i18n } = useTranslation();
  const { items } = useAppSelector((state) => state.cart);

  const currency = getCurrencyFromLang(i18n.language);
  const { subtotal, discount, deliveryFee, total, isLoading } =
    useCartPricing(currency);

  return (
    <div className="p-6 w-full md:w-[95%] lg:w-[90%] min-h-[88dvh] text-primary bg-background">
      <Breadcrumbs items={buildCartBreadcrumbs(t)} />

      <h1 className="mb-5 text-4xl font-extrabold uppercase">
        {t("cart.your_cart")}
      </h1>

      {isLoading ? (
        <div className="grid lg:grid-cols-[5fr_3fr] gap-5">
          <div className="border px-5 rounded-xl divide-y">
            {Array.from({ length: 3 }).map((_, i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>
          <CartOrderSummarySkeleton />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center pt-[18dvh] gap-6 min-h-[65vh] border rounded-xl">
          <ShoppingCart size={48} className="text-gray-400" />
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-center">
              {t("cart.your_cart_is_empty")}
            </h2>
            <p className="opacity-80 text-lg text-center max-w-xs mx-auto">
              {t(
                "cart.looks_like_you_haven't_added_any_products_to_your_cart_yet",
              )}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[5fr_3fr] gap-5">
          <div className="border px-5 rounded-xl divide-y">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          <CartOrderSummary
            subtotal={subtotal}
            discount={discount}
            deliveryFee={deliveryFee}
            total={total}
            currency={currency}
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
