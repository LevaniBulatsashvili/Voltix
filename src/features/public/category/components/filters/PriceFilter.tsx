import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { usePrice } from "@/features/user/cart/hooks/usePrice";
import { useDebounce } from "@/hooks/useDebounce";
import Slider from "@/components/ui/Slider";

interface IPriceFilter {
  t: (key: string) => string;
  min?: number;
  max?: number;
  onPriceFilterChange?: (min: number, max: number) => void;
}

const PriceFilter = ({
  t,
  min = 0,
  max = 5000,
  onPriceFilterChange,
}: IPriceFilter) => {
  const [isOpen, setIsOpen] = useState(false);

  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);
  const debouncedMin = useDebounce(minPrice, 300);
  const debouncedMax = useDebounce(maxPrice, 300);
  const { format } = usePrice();

  useEffect(() => {
    onPriceFilterChange?.(debouncedMin, debouncedMax);
  }, [debouncedMin, debouncedMax, onPriceFilterChange]);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 flex justify-between items-center transition-all"
      >
        <h2 className="text-xl font-semibold capitalize">
          {t("category.price")}
        </h2>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-2 pb-3" : "max-h-0"}`}
      >
        <Slider
          min={min}
          max={max}
          minValue={minPrice}
          maxValue={maxPrice}
          onRangeChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
        />

        <div className="flex justify-between mt-1 font-bold">
          <span>{format(minPrice)}</span>
          <span>{format(maxPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
