import { memo } from "react";
import { ShoppingCart } from "lucide-react";
import AppLink from "@/components/button/AppLink";
import { PAGE } from "@/pages/pageConfig";

interface ICartButton {
  totalItems: number;
  onNavigate?: () => void;
}

const CartButton = memo(({ totalItems, onNavigate }: ICartButton) => (
  <AppLink
    to={PAGE.USER.CART}
    className="relative"
    onClick={() => onNavigate?.()}
  >
    <ShoppingCart className="w-6 h-6" />
    {totalItems > 0 && (
      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        {totalItems}
      </span>
    )}
  </AppLink>
));

CartButton.displayName = "CartButton";
export default CartButton;
