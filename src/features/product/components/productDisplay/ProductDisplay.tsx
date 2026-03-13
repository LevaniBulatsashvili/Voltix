import { useState } from "react";
import type { IProduct } from "../../../../types/Product";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

interface IProductDisplay {
  product: IProduct;
}

const ProductDisplay = ({ product }: IProductDisplay) => {
  const {
    name,
    price,
    currency,
    discountPercentage,
    rating,
    stock,
    description,
  } = product;

  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const increase = () => {
    if (quantity < stock) setQuantity((q) => q + 1);
  };

  return (
    <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-[4fr_2fr] gap-6 sm:gap-10 mb-14 sm:mb-20">
      <ProductGallery name={name} />

      <ProductInfo
        name={name}
        rating={rating}
        price={price}
        discount={discountPercentage}
        currency={currency}
        description={description}
        stock={stock}
        quantity={quantity}
        increase={increase}
        decrease={decrease}
      />
    </div>
  );
};

export default ProductDisplay;
