import ProductHeader from "./ProductHeader";
import ProductActions from "./ProductActions";

interface IProductInfo {
  name: string;
  rating: number;
  price: number;
  discount?: number;
  currency: string;
  description: string;
  stock: number;
  quantity: number;
  increase: () => void;
  decrease: () => void;
}

const ProductInfo = ({
  name,
  rating,
  price,
  discount,
  currency,
  description,
  stock,
  quantity,
  increase,
  decrease,
}: IProductInfo) => {
  return (
    <div className="flex flex-col grow gap-4">
      <ProductHeader
        name={name}
        rating={rating}
        price={price}
        discount={discount}
        currency={currency}
      />
      <p>{description}</p>
      <ProductActions
        stock={stock}
        quantity={quantity}
        increase={increase}
        decrease={decrease}
      />
    </div>
  );
};

export default ProductInfo;
