import type { TFunction } from "i18next";
import type { ICartItem } from "../../../../../types/cart";
import Breadcrumbs from "../../../../../components/ui/BreadCrumbs";
import { buildCartBreadcrumbs } from "../../utils/buildCartBreadCrumbs";
import CartLoading from "./cartSkeleton/CartLoading";
import CartLayout from "./cartLayout/CartLayout";
import CartEmpty from "./cartEmpty/CartEmpty";

interface ICartViewProps {
  t: TFunction;
  items: ICartItem[];
  pricing: {
    subtotal: number;
    discount: number;
    deliveryFee: number;
    total: number;
    isLoading: boolean;
  };
}

const CartView = ({ t, items, pricing }: ICartViewProps) => {
  return (
    <div className="p-6 w-full md:w-[95%] lg:w-[90%] min-h-[88dvh] text-primary bg-background">
      <Breadcrumbs items={buildCartBreadcrumbs(t)} />

      <h1 className="mb-5 text-4xl font-extrabold uppercase">
        {t("cart.your_cart")}
      </h1>

      {pricing.isLoading ? (
        <CartLoading />
      ) : items.length === 0 ? (
        <CartEmpty t={t} />
      ) : (
        <CartLayout items={items} pricing={pricing} />
      )}
    </div>
  );
};

export default CartView;
