import { Skeleton } from "../../../../components/skeleton/Skeleton";

interface IProductCardGridSkeleton {
  count?: number;
}

const CategoryProductCardGridSkeleton = ({
  count = 6,
}: IProductCardGridSkeleton) => {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md p-4 animate-pulse"
        >
          <Skeleton className="w-full h-60 rounded-lg" />

          <div className="mt-3 space-y-2">
            <Skeleton className="w-3/4 h-6 rounded-md" />
            <Skeleton className="w-1/2 h-5 rounded-md" />
            <Skeleton className="w-1/3 h-6 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryProductCardGridSkeleton;
