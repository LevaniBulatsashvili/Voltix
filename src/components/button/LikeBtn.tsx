import { cn } from "@/utils/cn";
import { useCooldown } from "@/hooks/useCooldown";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface ILikeBtnOptions {
  isLiked: boolean;
  wishlistId?: number;
  onLike: () => void;
  heartSize?: number;
  className?: string;
  cooldownMs?: number;
  "aria-label"?: string;
}

const LikeBtn = ({
  isLiked,
  onLike,
  heartSize = 30,
  cooldownMs = 1000,
  className,
  "aria-label": ariaLabel,
}: ILikeBtnOptions) => {
  const { t } = useTranslation();
  const { isCoolingDown, run } = useCooldown(cooldownMs);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        run(onLike);
      }}
      disabled={isCoolingDown}
      aria-label={
        ariaLabel ??
        t(
          isLiked
            ? "wishlist.remove_from_wishlist"
            : "wishlist.add_to_wishlist",
        )
      }
      aria-pressed={isLiked}
      className={cn(
        "absolute top-3 right-3 z-10 bg-white/80 backdrop-blur p-2 rounded-full transition",
        isCoolingDown ? "opacity-50 cursor-not-allowed" : "hover:scale-110",
        className,
      )}
    >
      <Heart
        size={heartSize}
        className={cn(
          "transition",
          isLiked ? "fill-red-500 text-red-500" : "text-gray-600",
        )}
      />
    </button>
  );
};

export default LikeBtn;
