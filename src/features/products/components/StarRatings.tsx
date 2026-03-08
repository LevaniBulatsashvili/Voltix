import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
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

      <span className="ml-2 text-gray-500 font-light">{rating}/5</span>
    </div>
  );
};

export default StarRating;
