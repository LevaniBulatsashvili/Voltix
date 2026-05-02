import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateProductComment } from "@/features/public/product/hooks/productCommentCRUD";
import { notify } from "@/lib/toast/toast";
import PrimaryButton from "@/components/button/PrimaryBtn";

import { X } from "lucide-react";
import Modal from "@/components/ui/modal/Modal";
import { useAppSelector } from "@/hooks/redux";

interface IProductReviewModal {
  productId: number;
  onClose: () => void;
}

const ProductReviewModal = ({ productId, onClose }: IProductReviewModal) => {
  const { t } = useTranslation();
  const { profile } = useAppSelector((state) => state.profile);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");

  const { mutate: createComment, isPending } = useCreateProductComment();

  const handleClose = () => {
    setRating(0);
    setHovered(0);
    setComment("");
    onClose();
  };

  const handleSubmit = () => {
    if (rating === 0) return notify.error("Please select a rating");
    if (comment.trim().length < 10)
      return notify.error("Review must be at least 10 characters");
    if (comment.length > 500)
      return notify.error("Review must be under 500 characters");

    createComment(
      {
        product_id: productId,
        rating,
        comment,
        profile_id: profile!.id,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      className="max-w-md"
      disableClickOutside={true}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">{t("product.write_a_review")}</h2>
        <button onClick={onClose} className="opacity-70 hover:opacity-100">
          <X size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-2 mb-5">
        <label className="text-sm font-semibold opacity-70 capitalize">
          {t("product.your_rating")}
        </label>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const val = i + 1;
            return (
              <button
                key={i}
                onMouseEnter={() => setHovered(val)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(val)}
                className="text-3xl transition-transform hover:scale-110"
              >
                <span
                  className={
                    val <= (hovered || rating)
                      ? "text-yellow-400"
                      : "text-gray-200"
                  }
                >
                  ★
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <label className="text-sm font-semibold opacity-70 capitalize">
          {t("product.your_review")}
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          maxLength={500}
          placeholder={t("product.review")}
          className="w-full border border-primary/20 rounded-xl px-4 py-3 text-sm bg-background text-primary resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
        />
        <span className="text-xs opacity-40 self-end">
          {comment.length}/500
        </span>
      </div>

      <div className="flex justify-end gap-2">
        <PrimaryButton
          text={t("common.cancel")}
          onClick={onClose}
          className="py-2! text-primary! bg-background! border"
        />
        <PrimaryButton
          text={
            isPending ? t("product.submitting") : t("product.submit_review")
          }
          className="py-2!"
          disabled={isPending}
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default ProductReviewModal;
