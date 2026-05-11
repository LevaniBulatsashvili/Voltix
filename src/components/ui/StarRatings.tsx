import { cn } from "@/utils/cn";
import { Star, StarHalf } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface IStarRating {
  rating?: number;
  totalReviews?: number;
  className?: string;
}

const StarRating = ({
  rating = 0,
  totalReviews = 0,
  className,
}: IStarRating) => {
  const { t } = useTranslation();
  const isUnrated = rating === 0;

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          const step = i + 1;
          const isFull = rating >= step;
          const isHalf = rating > i && rating < step;

          if (isHalf) {
            return (
              <div key={i} className="relative">
                <Star size={20} className="text-slate-200 fill-slate-100" />
                <StarHalf
                  size={20}
                  className="absolute top-0 left-0 fill-yellow-400 text-yellow-400"
                />
              </div>
            );
          }

          return (
            <Star
              key={i}
              size={20}
              className={cn(
                "transition-colors",
                isFull
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-200 fill-slate-100",
              )}
            />
          );
        })}
      </div>

      {isUnrated ? (
        <span className="text-md font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded tracking-widest uppercase ml-1">
          {t("common.new")}
        </span>
      ) : (
        <div className="flex items-center gap-1">
          <span className="text-md font-bold text-slate-900">
            {rating.toFixed(1)}
          </span>
          <span className="text-md text-slate-500 font-bold">
            ({totalReviews})
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(StarRating);
