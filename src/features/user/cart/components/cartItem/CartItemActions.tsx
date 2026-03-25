import QuantitySelector from "../../../../../components/ui/QuantitySelector";
import { Trash2 } from "lucide-react";

interface ICartItemActions {
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  quantity: number;
  stock: number;
}

const CartItemActions = ({
  onRemove,
  onDecrease,
  onIncrease,
  quantity,
  stock,
}: ICartItemActions) => {
  return (
    <div className="flex flex-row-reverse sm:flex-col justify-between items-end h-full">
      <button
        onClick={onRemove}
        className="flex text-red-500 hover:text-red-600 transition"
      >
        <Trash2 size={20} />
      </button>

      <QuantitySelector
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        quantity={quantity}
        stock={stock}
      />
    </div>
  );
};

export default CartItemActions;
