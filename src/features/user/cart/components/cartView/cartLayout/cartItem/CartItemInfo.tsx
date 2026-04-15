import PriceTag from "@/components/ui/PriceTag";
import type { IProduct } from "@/types/public/product";
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
        <p className="text-mdd text-gray-500">{product.brand.name}</p>
      </div>

      <PriceTag price={product.price} discount={product.discount_percentage} />
    </div>
  );
};

export default CartItemInfo;
