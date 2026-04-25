import { Check } from "lucide-react";
import type { IProductComment } from "@/types/public/product";
import Avatar from "../ui/Avatar";
import { formatDateLong } from "@/utils/formatDateLong";

interface IProductCommentCard {
  productComment: IProductComment;
}

const ProductCommentCard = ({ productComment }: IProductCommentCard) => {
  return (
    <div className="bg-gray-50 p-7 rounded-2xl border border-gray-300 shadow hover:shadow-lg transition h-60 sm:h-80 overflow-auto">
      {(productComment.rating || productComment.rating === 0) && (
        <div className="text-3xl flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-yellow-500 ${
                i < productComment.rating ? "opacity-100" : "opacity-50"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center mb-4">
        <div className="w-12 h-12 mr-4 rounded-full bg-gray-200 flex items-center justify-center">
          <Avatar
            src={productComment.avatar || "/images/placeholders/user.webp"}
            className="size-8"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-black">
              {productComment.name}
            </p>
            {productComment.verified && (
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {formatDateLong(productComment.created_at)}
          </p>
        </div>
      </div>

      <p className="text-gray-700">{productComment.comment}</p>
    </div>
  );
};

export default ProductCommentCard;
