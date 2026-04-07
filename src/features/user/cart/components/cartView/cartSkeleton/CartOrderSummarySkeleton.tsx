import { Skeleton } from "../../../../../../components/skeleton/Skeleton";

const CartOrderSummarySkeleton = () => {
  return (
    <div className="flex flex-col border border-gray-300 rounded-xl p-5 space-y-6">
      <Skeleton className="h-8 w-1/2 mb-4" />
      <div className="space-y-4 border-b pb-4 border-gray-400">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
      </div>
      <Skeleton className="h-8 w-full mt-5" />
      <div className="space-y-3 sm:flex gap-3">
        <Skeleton className="h-10 w-full sm:w-auto rounded-full" />{" "}
        <Skeleton className="h-10 w-full sm:w-auto rounded-full" />{" "}
      </div>
      <Skeleton className="h-10 w-full rounded-full" />
    </div>
  );
};

export default CartOrderSummarySkeleton;
