import { cn } from "@/utils/cn";
import { Skeleton } from "./Skeleton";

interface ISelectDropdownSkeleton {
  className?: string;
}

const SelectDropdownSkeleton = ({ className }: ISelectDropdownSkeleton) => (
  <div className={cn("w-full", className)}>
    <Skeleton className="w-full h-10 rounded-lg mb-2" />
  </div>
);

export default SelectDropdownSkeleton;
