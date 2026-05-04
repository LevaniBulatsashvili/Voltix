import { type RefObject } from "react";

interface IProductsDisplaySlider {
  sliderRef: RefObject<HTMLImageElement | null>;
}
const ProductsDisplaySlider = ({ sliderRef }: IProductsDisplaySlider) => (
  <div className="relative w-full h-full flex justify-center items-center z-30">
    <img
      ref={sliderRef}
      src="/images/electronics/slider.webp"
      className="absolute left-0 opacity-0 will-change-transform"
      alt="slider"
    />
  </div>
);

export default ProductsDisplaySlider;
