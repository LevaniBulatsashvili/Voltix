import { useEffect } from "react";
import gsap from "gsap";
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

    const tl = gsap.timeline({ repeat: -1 });

    wrappers.forEach((wrapper, i) => {
      const layerIndex = wrappers.length - 1 - i;

      const scene = electronicsScene(
        wrapper!,
        slider,
        sceneDuration,
        layerIndex,
      );

      tl.add(scene, i === 0 ? 0 : "-=1.5");
    });

    return () => {
      tl.kill();
    };
  }, [sliderRef, itemRefs, items, sceneDuration]);
}
