import type { ReactNode } from "react";

interface ICarousel {
  items: ReactNode[];
  carouselClassName?: string;
  itemClassName?: string;
}

const Carousel = ({ items, carouselClassName, itemClassName }: ICarousel) => {
  const trackClasses =
    "flex items-center justify-center gap-4 pr-4 animate-scroll-left";
  const itemClasses = `flex-none text-center content-center p-[1em] size-[5em] text-[3rem] ${itemClassName}!`;

  return (
    <div
      className={`mx-auto flex overflow-hidden w-[90%] ${carouselClassName}`}
    >
      <div className={trackClasses}>
        {items.map((item, index) => (
          <div key={index} className={itemClasses}>
            {item}
          </div>
        ))}
      </div>

      <div aria-hidden className={trackClasses}>
        {items.map((item, index) => (
          <div key={`dup-${index}`} className={itemClasses}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
