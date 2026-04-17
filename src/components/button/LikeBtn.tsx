import { useCooldown } from "@/hooks/useCooldown";
import { Heart } from "lucide-react";

export interface ILikeBtnOptions {
  isLiked: boolean;
  wishlistId?: number;
  onLike: () => void;
  heartSize?: number;
  className?: string;
  cooldownMs?: number;
}

const LikeBtn = ({
  isLiked,
  onLike,
  heartSize = 30,
  cooldownMs = 1000,
  className = "",
}: ILikeBtnOptions) => {
  const { isCoolingDown, run } = useCooldown(cooldownMs);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        run(onLike);
      }}
      disabled={isCoolingDown}
      className={`absolute top-3 right-3 z-10 bg-white/80 backdrop-blur p-2 rounded-full transition
          ${isCoolingDown ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
          ${className}`}
    >
      <Heart
        size={heartSize}
        className={`transition ${
          isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
        }`}
      />
    </button>
  );
};

export default LikeBtn;
