import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
            text={t("product-add to cart")}
            onClick={handleAddToCart}
            className="bg-primary text-background flex-1 hover:opacity-80"
          />
        </>
      ) : (
        <ProductBtn
          text={t("product-out of stock")}
          disabled
          className="w-full bg-gray-400 text-white cursor-not-allowed py-3"
        />
      )}
    </div>
  );
};

export default ProductActions;
