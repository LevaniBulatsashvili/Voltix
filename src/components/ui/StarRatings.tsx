import { Star, StarHalf } from "lucide-react";
import { memo } from "react";

interface IStarRating {
  rating: number;
  textColor?: string;
}

const StarRating = ({ rating, textColor = "primary" }: IStarRating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 text-yellow-500" />
      ))}

      {halfStar === 1 && (
        <StarHalf key="half" className="w-5 h-5 text-yellow-500" />
      )}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}

      <span className={`ml-2 text-${textColor}`}>
        {rating}
        <span className="opacity-60">/5</span>
      </span>
    </div>
  );
};

export default memo(StarRating);
