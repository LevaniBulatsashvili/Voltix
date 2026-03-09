import QuantitySelector from "../../../../components/ui/QuantitySelector";
import AddToCartButton from "../buttons/AddToCartButton";
import OutOfStockButton from "../buttons/OutOfStockButton";

interface IProductActions {
  stock: number;
  quantity: number;
  increase: () => void;
  decrease: () => void;
}

const ProductActions = ({
  stock,
  quantity,
  increase,
  decrease,
}: IProductActions) => {
  return (
    <div className="mt-auto pt-4 flex items-center gap-4">
      {stock > 0 ? (
        <>
          <QuantitySelector
            quantity={quantity}
            stock={stock}
            onIncrease={increase}
            onDecrease={decrease}
          />
          <AddToCartButton />
        </>
      ) : (
        <OutOfStockButton />
      )}
    </div>
  );
};

export default ProductActions;
