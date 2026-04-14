import { Skeleton } from "./Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="overflow-hidden rounded-lg">
        <Skeleton className="w-full h-60" />
      </div>

      <div className="mt-3 space-y-2">
        <Skeleton className="h-5 w-3/4" />

        <Skeleton className="h-4 w-1/2" />

        <Skeleton className="h-5 w-1/3" />
      </div>
    </div>
  );
}
