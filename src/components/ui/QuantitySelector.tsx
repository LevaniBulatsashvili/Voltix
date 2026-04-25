import { Minus, Plus } from "lucide-react";

interface IQuantitySelector {
  quantity: number;
  maxQuantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  isDisabled?: boolean;
}

const QuantitySelector = ({
  quantity,
  maxQuantity,
  onIncrease,
  onDecrease,
  isDisabled = false,
}: IQuantitySelector) => {
  return (
    <div
      className={`flex items-center border border-gray-300 overflow-hidden rounded-full ${isDisabled ? "opacity-70 pointer-events-none" : ""}`}
    >
      <button
        onClick={onDecrease}
        disabled={quantity === 0 || isDisabled}
        className="p-2 flex items-center justify-center  hover:bg-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <Minus size={18} />
      </button>

      <span className="px-4 min-w-12  overflow  text-center font-medium">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        disabled={quantity === maxQuantity || isDisabled}
        className="p-2 flex items-center justify-center  hover:bg-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default QuantitySelector;
