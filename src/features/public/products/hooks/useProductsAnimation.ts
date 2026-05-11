import { useEffect } from "react";
import { electronicsScene } from "../utils/electronicsScene";
import { type IElectronicItem } from "../utils/electronicsConfig";

interface UseProductsAnimationProps {
  sliderRef: React.RefObject<HTMLImageElement | null>;
  itemRefs: React.RefObject<(HTMLDivElement | null)[]>;
  items: IElectronicItem[];
  sceneDuration: number;
}

export function useProductsAnimation({
  sliderRef,
  itemRefs,
  items,
  sceneDuration,
}: UseProductsAnimationProps) {
  useEffect(() => {
    const slider = sliderRef.current;
    const wrappers = itemRefs.current;

    if (!slider || wrappers.some((w) => !w)) return;

    import("gsap").then(({ gsap }) => {
      const tl = gsap.timeline({ repeat: -1 });

      wrappers.forEach((wrapper, i) => {
        const layerIndex = wrappers.length - 1 - i;
        const scene = electronicsScene(
          gsap,
          wrapper!,
          slider,
          sceneDuration,
          layerIndex,
        );
        tl.add(scene, i === 0 ? 0 : "-=1.5");
      });
    });

    return () => {
      import("gsap").then(({ gsap }) => gsap.killTweensOf("*"));
    };
  }, [sliderRef, itemRefs, items, sceneDuration]);
}
