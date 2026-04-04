import Carousel from "../../../../components/carousel/Carousel";
import { Skeleton } from "../../../../components/ui/Skeleton";

interface IProductsCarouselSkeleton {
  count?: number;
}

const ProductsCarouselSkeleton = ({
  count = 14,
}: IProductsCarouselSkeleton) => {
  const items = Array.from({ length: count }).map((_, index) => (
    <Skeleton
      key={index}
      className="
        size-16
        sm:w-20 sm:h-20
        lg:w-24 lg:h-24
        rounded-lg
      "
    />
  ));

  return (
    <Carousel
      items={items}
      carouselClassName="my-4 xl:my-10 border-y-4 border-primary bg-white"
      itemClassName="size-[4em] sm:size-[4.5em] lg:size-[5em] text-[2.5rem] sm:text-[3rem]"
    />
  );
};

export default ProductsCarouselSkeleton;
