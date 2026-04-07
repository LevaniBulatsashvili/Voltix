import { Skeleton } from "./Skeleton";

interface ISelectDropdownSkeleton {
  className?: string;
}

const SelectDropdownSkeleton = ({
  className = "",
}: ISelectDropdownSkeleton) => {
  return (
    <div className={`${className} w-full`}>
      <Skeleton className="w-full h-10 rounded-lg mb-2" />
    </div>
  );
};

export default SelectDropdownSkeleton;
