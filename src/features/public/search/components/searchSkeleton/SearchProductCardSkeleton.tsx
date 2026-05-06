import { cn } from "@/utils/cn";
import { Skeleton } from "@/components/skeleton/Skeleton";

const colsMap: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

interface ISearchProductCardGridSkeleton {
  count?: number;
  cols?: number;
}

const SearchProductCardGridSkeleton = ({
  count = 6,
  cols = 2,
}: ISearchProductCardGridSkeleton) => (
  <div className={cn("grid gap-4", colsMap[cols] ?? "sm:grid-cols-2")}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white rounded-xl shadow-md p-4 animate-pulse">
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

export default SearchProductCardGridSkeleton;
