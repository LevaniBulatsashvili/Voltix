import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../../components/ui/BreadCrumbs";
import { buildCartBreadcrumbs } from "../utils/buildCartBreadCrumbs";
import CartItem from "./cartItem/CartItem";
import CartOrderSummary from "./cartOrderSummary/CartOrderSummary";
import CartOrderSummarySkeleton from "./cartSkeleton/CartOrderSummarySkeleton";
import CartItemSkeleton from "./cartSkeleton/CartItemSkeleton";
import useFetchRates from "../../hooks/useFetchRates";
import {
  calculateDeliveryFee,
  calculateProductDiscount,
  calculateSubtotal,
} from "../utils/cartProductCalcs";
import { useAppSelector } from "../../../../hooks/redux";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const { t, i18n } = useTranslation();
  const { items } = useAppSelector((state) => state.cart);
  const { data: ratesData, isLoading: ratesLoading } = useFetchRates(
    "GEL",
    "USD",
  );

  const targetCurrency: "GEL" | "USD" = i18n.language === "ka" ? "GEL" : "USD";

  const subtotal =
    ratesData && items.length > 0
      ? calculateSubtotal(items, targetCurrency, ratesData)
      : 0;

  const discount =
    ratesData && items.length > 0
      ? calculateProductDiscount(items, targetCurrency, ratesData)
      : 0;

  return (
    <div className="p-6 w-full md:w-[95%] lg:w-[90%] min-h-[88dvh] text-primary bg-background">
      <Breadcrumbs items={buildCartBreadcrumbs(t)} />

      <h1 className="mb-5 text-4xl font-extrabold uppercase">
        {t("cart.your_cart")}
      </h1>

      {ratesLoading ? (
        <div className="grid lg:grid-cols-[5fr_3fr] gap-5">
          <div className="border px-5 border-gray-300 rounded-xl divide-y divide-gray-300">
            {Array.from({ length: 3 }).map((_, idx) => (
              <CartItemSkeleton key={idx} />
            ))}
          </div>
          <CartOrderSummarySkeleton />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 min-h-[65vh] border border-gray-300 rounded-xl">
          <ShoppingCart size={48} className="text-gray-400" />
          <h2 className="text-2xl font-bold  capitalize">
            {t("cart.your_cart_is_empty")}
          </h2>
          <p className="opacity-80 text-center max-w-xs">
            {t(
              "cart.looks_like_you_haven't_added_any_products_to_your_cart_yet",
            )}
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[5fr_3fr] gap-5">
          <div className="border px-5 border-gray-300 rounded-xl divide-y divide-gray-300">
            {items.map(({ product, quantity }) => (
              <CartItem key={product.id} item={{ product, quantity }} />
            ))}
          </div>

          {items.length > 0 && ratesData && (
            <CartOrderSummary
              subtotal={subtotal}
              discount={discount}
              deliveryFee={calculateDeliveryFee(
                15,
                "USD",
                targetCurrency,
                ratesData,
              )}
              currency={targetCurrency}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
