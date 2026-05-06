import { cn } from "@/utils/cn";
import SelectDropdownSkeleton from "./SelectDropdownSkeleton";

interface ISelectDropdownGridSkeleton {
  itemCount?: number;
  className?: string;
}

const SelectDropdownGridSkeleton = ({
  itemCount = 4,
  className,
}: ISelectDropdownGridSkeleton) => (
  <div className={cn("py-3 border-y border-gray-300", className)}>
    {Array.from({ length: itemCount }).map((_, i) => (
      <SelectDropdownSkeleton key={i} />
    ))}
  </div>
);

export default SelectDropdownGridSkeleton;
