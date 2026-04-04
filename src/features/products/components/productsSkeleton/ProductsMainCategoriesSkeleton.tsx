import { Skeleton } from "../../../../components/ui/Skeleton";

const spanPattern = [
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
];

const ProductsMainCategoriesSkeleton = () => {
  const placeholders = Array.from({ length: 4 });

  return (
    <div className="grid grid-cols-5 gap-5">
      {placeholders.map((_, index) => {
        const isLast = index === placeholders.length - 1;
        const isOdd = placeholders.length % 2 !== 0;

        const colSpan =
          isLast && isOdd
            ? "lg:col-span-5"
            : spanPattern[index % spanPattern.length];

        return (
          <div key={index} className={`col-span-5 ${colSpan}`}>
            <Skeleton className="h-72.5 w-full rounded-2xl" />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsMainCategoriesSkeleton;
