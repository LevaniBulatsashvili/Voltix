import { Minus, Plus } from "lucide-react";

interface IQuantitySelector {
  quantity: number;
  maxQuantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector = ({
  quantity,
  maxQuantity,
  onIncrease,
  onDecrease,
}: IQuantitySelector) => {
  return (
    <div className="flex items-center border border-gray-300 overflow-hidden bg-white rounded-full">
      <button
        onClick={onDecrease}
        disabled={quantity === 0}
        className="p-2 flex items-center justify-center text-black hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <Minus size={18} />
      </button>

      <span className="px-4 min-w-12  overflow text-black text-center font-medium">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        disabled={quantity === maxQuantity}
        className="p-2 flex items-center justify-center text-black hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default QuantitySelector;
