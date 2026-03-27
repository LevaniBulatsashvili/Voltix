import ProductHeader from "./ProductHeader";
import ProductActions from "./ProductActions";
import type { IProduct } from "../../../../types/product";

interface IProductInfo {
  product: IProduct;
  quantity: number;
  maxQuantity: number;
  increase: () => void;
  decrease: () => void;
  handleAddToCart: () => void;
}

const ProductInfo = ({
  product,
  quantity,
  maxQuantity,
  increase,
  decrease,
  handleAddToCart,
}: IProductInfo) => {
  const { name, rating, price, discount_percentage, currency, description } =
    product;

  return (
    <div className="flex flex-col grow gap-4">
      <ProductHeader
        name={name}
        rating={rating}
        price={price}
        discount={discount_percentage}
        currency={currency}
      />
      <p>{description}</p>
      <ProductActions
        product={product}
        maxQuantity={maxQuantity}
        quantity={quantity}
        increase={increase}
        decrease={decrease}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductInfo;
