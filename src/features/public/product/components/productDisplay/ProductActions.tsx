import type { IProduct } from "@/types/public/product";
import QuantitySelector from "@/components/ui/QuantitySelector";
import ProductBtn from "@/components/button/ProductBtn";
import { useAppSelector } from "@/hooks/redux";

interface IProductActions {
  product: IProduct;
  quantity: number;
  maxQuantity: number;
  increase: () => void;
  decrease: () => void;
  handleAddToCart: () => void;
}

const ProductActions = ({
  product,
  quantity,
  maxQuantity,
  increase,
  decrease,
  handleAddToCart,
}: IProductActions) => {
  const { profile } = useAppSelector((state) => state.profile);
  const isDisabled = profile?.role !== "user";

  return (
    <div className="mt-auto pt-4 flex items-center gap-4">
      {product.stock > 0 ? (
        <>
          <QuantitySelector
            quantity={quantity}
            maxQuantity={maxQuantity}
            onIncrease={increase}
            onDecrease={decrease}
            isDisabled={isDisabled}
          />

          <ProductBtn
            text="product.add_to_cart"
            onClick={handleAddToCart}
            className={`bg-primary max-w-60 text-background flex-1 hover:opacity-80 ${isDisabled ? "opacity-70 pointer-events-none" : ""}`}
            disabled={isDisabled}
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
