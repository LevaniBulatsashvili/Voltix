import ProductHeader from "./ProductHeader";
import ProductActions from "./ProductActions";
import type { IProduct } from "@/types/product";

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
  const { name, rating_avg, price, discount_percentage, description } = product;

  return (
    <div className="flex flex-col grow gap-4">
      <ProductHeader
        name={name}
        rating={rating_avg}
        price={price}
        discount={discount_percentage}
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
