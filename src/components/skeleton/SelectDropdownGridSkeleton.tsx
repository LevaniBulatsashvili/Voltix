import SelectDropdownSkeleton from "./SelectDropdownSkeleton";

interface SelectDropdownGridSkeleton {
  itemCount?: number;
  className?: string;
}

const SelectDropdownGridSkeleton = ({
  itemCount = 4,
  className = "",
}: SelectDropdownGridSkeleton) => {
  return (
    <div className={`py-3 border-y border-gray-300 ${className}`}>
      {Array.from({ length: itemCount }).map((_, i) => (
        <SelectDropdownSkeleton key={i} />
      ))}
    </div>
  );
};

export default SelectDropdownGridSkeleton;
