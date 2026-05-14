import QuantitySelector from "@/components/ui/QuantitySelector";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ICartItemActions {
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  quantity: number;
  maxQuantity: number;
}

const CartItemActions = ({
  onRemove,
  onDecrease,
  onIncrease,
  quantity,
  maxQuantity,
}: ICartItemActions) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row-reverse sm:flex-col justify-between items-end h-full">
      <button
        onClick={onRemove}
        className="flex text-primary hover:text-gray-400 transition"
        aria-label={t("cart.remove_item")}
      >
        <Trash2 size={24} />
      </button>

      <QuantitySelector
        quantity={quantity}
        maxQuantity={maxQuantity}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    </div>
  );
};

export default CartItemActions;
