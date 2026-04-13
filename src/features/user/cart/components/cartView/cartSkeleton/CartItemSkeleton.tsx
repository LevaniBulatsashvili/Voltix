import { Skeleton } from "@/components/skeleton/Skeleton";

const CartItemSkeleton = () => {
  return (
    <div className="space-y-4 sm:flex gap-4 py-5">
      <div className="size-24 sm:size-32 shrink-0">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>

      <div className="flex-1 min-w-0 grid grid-cols-1 gap-5 sm:gap-0 sm:grid-cols-[5fr_2fr]">
        <div className="flex flex-col justify-between h-full">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-6 w-1/4 mt-2" />
        </div>

        <div className="flex flex-col justify-between items-end h-full">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full mt-auto" />{" "}
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
