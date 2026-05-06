import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface ICarousel {
  items: ReactNode[];
  carouselClassName?: string;
  itemClassName?: string;
}

const TRACK_CLASS =
  "flex items-center justify-center gap-4 pr-4 animate-scroll-left";

const Carousel = ({ items, carouselClassName, itemClassName }: ICarousel) => {
  const itemClass = cn(
    "flex-none text-center content-center p-[1em]",
    itemClassName,
  );

  const renderItems = (keyPrefix: string) =>
    items.map((item, index) => (
      <div key={`${keyPrefix}-${index}`} className={itemClass}>
        {item}
      </div>
    ));

  return (
    <div className={cn("flex overflow-hidden w-full", carouselClassName)}>
      <div className={TRACK_CLASS}>{renderItems("a")}</div>
      <div aria-hidden className={TRACK_CLASS}>
        {renderItems("dup")}
      </div>
    </div>
  );
};

export default Carousel;
