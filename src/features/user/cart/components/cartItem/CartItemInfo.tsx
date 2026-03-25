import PriceTag from "../../../../../components/ui/PriceTag";
import type { IProduct } from "../../../../../types/Product";

interface ICartItemInfo {
  product: IProduct;
}

const CartItemInfo = ({ product }: ICartItemInfo) => {
  return (
    <div className="flex flex-col items-start justify-between">
      <div className="flex flex-col">
        <h2 className="font-semibold text-xl self-start justify-self-start">
          {product.name}
        </h2>
        <p className="text-mdd text-gray-500">{product.brand}</p>
      </div>
      <div className="text-right">
        {product.discount_percentage && (
          <p className="text-sm text-gray-400 line-through">
            {product.price} {product.currency}
          </p>
        )}

        <PriceTag
          currency={product.currency}
          price={product.price}
          discount={product.discount_percentage}
        />
      </div>
    </div>
  );
};

export default CartItemInfo;
