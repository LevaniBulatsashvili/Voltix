import { memo, useCallback, useRef } from "react";
import { useBinaryChains } from "../../hooks/useBinaryChains";
import { useProductsAnimation } from "../../hooks/useProductsAnimation";
import {
  BANNER_PRELOADS,
  ELECTRONICS,
  SCENE_DURATION,
} from "../../utils/electronicsConfig";
import ProductsDisplaySlider from "./ProductsDisplaySlider";
import ProductsDisplayBinaryChains from "./ProductsDisplayBinaryChains";
import ProductsDisplayProducts from "./ProductsDisplayProducts";
import useBannerPreloads from "../../hooks/useBannerPreloads";

const ProductsDisplayAnimatedBanner = () => {
  useBannerPreloads(BANNER_PRELOADS);
  const { containerRef } = useBinaryChains();
  const sliderRef = useRef<HTMLImageElement>(null);
  const electronicsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setElectronicRef = useCallback(
    (el: HTMLDivElement | null, i: number) => {
      electronicsRefs.current[i] = el;
    },
    [],
  );

  useProductsAnimation({
    sliderRef,
    itemRefs: electronicsRefs,
    items: ELECTRONICS,
    sceneDuration: SCENE_DURATION,
  });

  return (
    <>
      <ProductsDisplayBinaryChains containerRef={containerRef} />
      <ProductsDisplaySlider sliderRef={sliderRef} />
      <ProductsDisplayProducts items={ELECTRONICS} setRef={setElectronicRef} />
    </>
  );
};

export default memo(ProductsDisplayAnimatedBanner);
