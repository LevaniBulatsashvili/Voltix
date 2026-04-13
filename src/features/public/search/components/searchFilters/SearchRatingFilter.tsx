import { useState, useEffect } from "react";
import { ChevronDown, Star } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import Slider from "@/components/ui/Slider";

interface ISearchRatingFilter {
  t: (key: string) => string;
  value?: number | null;
  onChange?: (rating?: number) => void;
}

const SearchRatingFilter = ({
  t,
  value = null,
  onChange,
}: ISearchRatingFilter) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(value ?? 0);

  const debouncedRating = useDebounce(rating, 300);

  useEffect(() => {
    onChange?.(debouncedRating === 0 ? undefined : debouncedRating);
  }, [debouncedRating, onChange]);

  return (
    <div className="w-full border-y border-gray-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 flex justify-between items-center transition-all"
      >
        <h2 className="text-xl font-semibold capitalize">
          {t("search.rating")}
        </h2>

        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 mt-2 pb-3" : "max-h-0"
        }`}
      >
        <Slider
          min={0}
          max={5}
          step={0.1}
          value={rating}
          onChange={setRating}
        />

        <div className="flex justify-between mt-2 items-center">
          <span className="text-sm text-primary/80">
            {rating === 0 ? " 0+" : `${rating.toFixed(1)}+`}
          </span>

          <div className="flex items-center text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="ml-1 text-sm font-medium">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchRatingFilter;
