import { useRef } from "react";
import { useBinaryChains } from "../../hooks/useBinaryChains";
import { useProductsAnimation } from "../../hooks/useProductsAnimation";
import { ELECTRONICS, SCENE_DURATION } from "../../utils/electronicsConfig";
import ProductsDisplayBackground from "./ProductsDisplayBackground";
import ProductsDisplaySlider from "./ProductsDisplaySlider";
import ProductsDisplayBinaryChains from "./ProductsDisplayBinaryChains";
import ProductsDisplayProducts from "./ProductsDisplayProducts";

const ProductsDisplayBanner = () => {
  const { containerRef } = useBinaryChains();
  const sliderRef = useRef<HTMLImageElement>(null);
  const electronicsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useProductsAnimation({
    sliderRef,
    itemRefs: electronicsRefs,
    items: ELECTRONICS,
    sceneDuration: SCENE_DURATION,
  });

  return (
    <div className="mt-10 xl:mt-0 min-h-109 relative overflow-hidden contain-[layout_style] rounded-4xl">
      <ProductsDisplayBackground />
      <ProductsDisplayBinaryChains containerRef={containerRef} />
      <ProductsDisplaySlider sliderRef={sliderRef} />

      <ProductsDisplayProducts items={ELECTRONICS} refs={electronicsRefs} />
    </div>
  );
};

export default ProductsDisplayBanner;
