import { Skeleton } from "../../../../components/ui/Skeleton";

const ProductGallerySkeleton = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 w-full">
      <div className="grid grid-cols-3 sm:grid-cols-1 sm:grid-rows-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="sm:size-44 h-20 w-full rounded" />
        ))}
      </div>

      <div className="flex-1">
        <Skeleton className="w-full h-75 sm:h-136 rounded-lg" />
      </div>
    </div>
  );
};

export default ProductGallerySkeleton;
