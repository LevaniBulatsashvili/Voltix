import { memo } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProductsDisplayBackground from "./ProductsDisplayBackground";
import ProductsDisplayAnimatedBanner from "./ProductsDisplayAnimatedBanner";
import { ELECTRONICS } from "../../utils/electronicsConfig";

const ProductsDisplayBanner = () => {
  const isMobile = useIsMobile();

  return (
    <div className="mt-10 xl:mt-0 min-h-109 relative overflow-hidden contain-[layout_style] rounded-4xl">
      <ProductsDisplayBackground />
      {isMobile ? (
        <img
          src={ELECTRONICS[0].src}
          alt={ELECTRONICS[0].alt}
          className="absolute inset-0 w-full h-full object-contain"
        />
      ) : (
        <ProductsDisplayAnimatedBanner />
      )}
    </div>
  );
};

export default memo(ProductsDisplayBanner);
