import { type RefObject } from "react";

interface IProductsDisplayBinaryChains {
  containerRef: RefObject<HTMLDivElement | null>;
}

const ProductsDisplayBinaryChains = ({
  containerRef,
}: IProductsDisplayBinaryChains) => (
  <div ref={containerRef} className="absolute inset-0" />
);

export default ProductsDisplayBinaryChains;
