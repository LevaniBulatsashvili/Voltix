import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { usePrice } from "../../../user/cart/hooks/usePrice";
import { useDebounce } from "../../../../hooks/useDebounce";

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
  const sliderRef = useRef<HTMLDivElement>(null);
  const { format } = usePrice();

  useEffect(() => {
    onPriceFilterChange?.(debouncedMin, debouncedMax);
  }, [debouncedMin, debouncedMax, onPriceFilterChange]);
  const percent = (value: number) =>
    Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const handleDrag = (e: MouseEvent | TouchEvent, handle: "min" | "max") => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let clientX: number;
    if (e instanceof MouseEvent) clientX = e.clientX;
    else clientX = e.touches[0].clientX;

    let percentVal = ((clientX - rect.left) / rect.width) * (max - min) + min;
    percentVal = Math.round(Math.max(min, Math.min(max, percentVal)));

    if (handle === "min") {
      if (percentVal >= maxPrice) percentVal = maxPrice - 1;
      setMinPrice(percentVal);
    } else {
      if (percentVal <= minPrice) percentVal = minPrice + 1;
      setMaxPrice(percentVal);
    }
  };

  const startDrag = (handle: "min" | "max") => () => {
    const move = (event: MouseEvent | TouchEvent) => handleDrag(event, handle);

    const stop = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", stop);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
    document.addEventListener("touchmove", move);
    document.addEventListener("touchend", stop);
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 flex justify-between items-center hover:border-b transition-all"
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
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-2" : "max-h-0"}`}
      >
        <div className="relative h-10 w-full" ref={sliderRef}>
          <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full bg-primary/40 rounded"></div>

          <div
            className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-primary/80 rounded"
            style={{
              left: `${percent(minPrice)}%`,
              width: `${percent(maxPrice) - percent(minPrice)}%`,
            }}
          />

          <div
            onMouseDown={startDrag("min")}
            onTouchStart={startDrag("min")}
            className="absolute top-1/2 -translate-y-1/2 size-6 bg-primary border rounded-full shadow cursor-pointer"
            style={{ left: `calc(${percent(minPrice)}% - 12px)` }}
          />
          <div
            onMouseDown={startDrag("max")}
            onTouchStart={startDrag("max")}
            className="absolute top-1/2 -translate-y-1/2 size-6 bg-primary border rounded-full shadow cursor-pointer"
            style={{ left: `calc(${percent(maxPrice)}% - 12px)` }}
          />
        </div>

        <div className="flex justify-between mt-1 font-bold">
          <span>{format(minPrice)}</span>
          <span>{format(maxPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
