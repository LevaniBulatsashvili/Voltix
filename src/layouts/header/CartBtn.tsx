import { ShoppingCart } from "lucide-react";
import AppLink from "@/components/button/AppLink";
import { PAGE } from "@/pages/pageConfig";
import { useTranslation } from "react-i18next";

interface ICartButton {
  totalItems: number;
  onNavigate?: () => void;
}

const CartButton = ({ totalItems, onNavigate }: ICartButton) => {
  const { t } = useTranslation();

  return (
    <AppLink
      to={PAGE.USER.CART}
      className="relative"
      aria-label={t("cart.cart")}
      onClick={() => onNavigate?.()}
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </AppLink>
  );
};
CartButton.displayName = "CartButton";
export default CartButton;
