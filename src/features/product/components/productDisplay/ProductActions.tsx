import ProductBtn from "../../../../components/button/ProductBtn";
import QuantitySelector from "../../../../components/ui/QuantitySelector";

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
  const handleAddToCart = () => {};

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
          <ProductBtn
            text="product.add_to_cart"
            onClick={handleAddToCart}
            className="bg-primary max-w-60 text-background flex-1 hover:opacity-80"
          />
        </>
      ) : (
        <ProductBtn
          text="product.out_of_stock"
          disabled
          className="w-full max-w-60 bg-gray-400 text-white cursor-not-allowed py-3"
        />
      )}
    </div>
  );
};

export default ProductActions;
