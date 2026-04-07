import { Skeleton } from "../../../../components/skeleton/Skeleton";

interface IProductCommentsListSkeleton {
  className?: string;
  count?: number;
}

const ProductsCommentsListSkeleton = ({
  className = "",
  count = 3,
}: IProductCommentsListSkeleton) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-50 p-7 rounded-2xl border border-gray-300 shadow h-60 sm:h-80 flex flex-col gap-4"
        >
          <Skeleton className="h-6 w-1/2 rounded-md" />

          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-5 w-1/2 rounded-md" />
              <Skeleton className="h-3 w-1/3 rounded-md" />
            </div>
          </div>

          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default ProductsCommentsListSkeleton;
