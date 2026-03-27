import { useState } from "react";
import type { IProduct } from "../../../../types/product";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { addToCart } from "../../../user/cart/store/cart.slice";
import { notifySuccess } from "../../../../lib/toast/notifySuccess";

interface IProductDisplay {
  product: IProduct;
}

const ProductDisplay = ({ product }: IProductDisplay) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const inCartQuantity =
    items.find((item) => item.product.id === product.id)?.quantity || 0;
  const maxQuantity = product.stock - inCartQuantity;
  const [quantity, setQuantity] = useState(maxQuantity > 0 ? 1 : 0);

  const decrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const increase = () => {
    if (quantity < product.stock) setQuantity((q) => q + 1);
  };

  const resetQuantity = () => setQuantity(1);

  const handleAddToCart = () => {
    if (quantity <= 0) return;

    dispatch(addToCart({ product, quantity }));
    notifySuccess("product.product_added");

    if (maxQuantity - quantity !== 0) return resetQuantity();
    setQuantity(0);
  };

  return (
    <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-[4fr_2fr] gap-6 sm:gap-10 mb-14 sm:mb-20">
      <ProductGallery name={product.name} />

      <ProductInfo
        product={product}
        quantity={quantity}
        maxQuantity={maxQuantity}
        increase={increase}
        decrease={decrease}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductDisplay;
