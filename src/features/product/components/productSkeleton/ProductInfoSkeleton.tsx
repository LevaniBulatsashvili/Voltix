import { Skeleton } from "../../../../components/ui/Skeleton";

const ProductInfoSkeleton = () => {
  return (
    <div className="flex flex-col grow gap-4">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-4 w-36" />
      <Skeleton className="h-6 w-40" />

      <Skeleton className="h-4 w-1/2" />

      <div className="mt-auto pt-4 flex items-center gap-4">
        <Skeleton className="h-10 w-32 rounded-full" />
        <Skeleton className="h-10 w-46 rounded-full" />
      </div>
    </div>
  );
};

export default ProductInfoSkeleton;
