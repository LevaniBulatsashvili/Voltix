import { Skeleton } from "@/components/skeleton/Skeleton";

const ProductShowcaseSkeleton = () => {
  return (
    <div className="w-[90%] mx-auto my-15 text-center">
      <Skeleton className="h-35 sm:h-15 w-50 sm:w-100 mx-auto mb-14" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2 p-4 rounded-lg bg-white">
            <Skeleton className="h-60 w-full" />
            <Skeleton className="h-6 w-2/5" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-2/5" />
          </div>
        ))}
      </div>
      <Skeleton className="h-12 w-45 mx-auto rounded-full! mt-16" />
    </div>
  );
};

export default ProductShowcaseSkeleton;
