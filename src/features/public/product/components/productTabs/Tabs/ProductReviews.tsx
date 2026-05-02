import { useState } from "react";
import ProductCommentCard from "@/components/cards/ProductCommentCard";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useInfiniteFetchProductComments } from "../../../hooks/productCommentCRUD";
import { InfiniteGrid } from "@/components/ui/InfiniteGrid";
import { useInfiniteList } from "@/hooks/useInfiniteList";
import PrimaryButton from "@/components/button/PrimaryBtn";
import { useRole } from "@/features/user/profile/hooks/useRole";
import ProductReviewsNoData from "./productReview/ProductReviewsNoData";
import ProductReviewModal from "./productReview/ProductReviewModal";

interface IProductReviews {
  productId: number;
}

const ProductReviews = ({ productId }: IProductReviews) => {
  const { t } = useTranslation();
  const { isVerified, isRole } = useRole();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [showReviewModal, setShowReviewModal] = useState(false);

  const {
    items,
    total,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteList(
    useInfiniteFetchProductComments({
      limit: 2,
      sort: [{ field: "created_at", ascending: sortOrder === "newest" }],
      filters: { eq: { product_id: productId } },
    }),
  );

  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));

  return (
    <div className="p-6 w-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold capitalize">
          {t("product.customer_reviews")} ({total})
        </h2>
        <div className="flex items-center gap-2">
          <button
            className="bg-gray-200 text-gray-700 w-30 px-6 py-3 rounded-full font-semibold flex items-center gap-1 hover:bg-gray-300 justify-center capitalize"
            onClick={toggleSortOrder}
          >
            <span>
              {sortOrder === "newest"
                ? t("product.latest")
                : t("product.oldest")}
            </span>
            <ChevronDown
              className={`ml-1 size-4 ${sortOrder === "newest" ? "rotate-0" : "rotate-180"}`}
            />
          </button>

          {isVerified && (
            <PrimaryButton
              text={t("product.review")}
              className={`rounded-full! ${isRole(["admin"]) ? "opacity-70! pointer-events-none" : ""}`}
              disabled={isRole(["admin"])}
              onClick={() => setShowReviewModal(true)}
            />
          )}
        </div>
      </div>

      <InfiniteGrid
        items={items}
        error={error}
        isFetching={isFetching}
        noDataFallback={<ProductReviewsNoData />}
        gridClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
        renderItem={(comment) => (
          <ProductCommentCard key={comment.id} productComment={comment} />
        )}
      />

      {!isFetching && hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="self-center bg-gray-100 text-black px-9 py-3 rounded-full font-semibold hover:bg-gray-200 transition mt-4 sm:mt-6 capitalize"
        >
          {isFetchingNextPage
            ? t("product.loading")
            : t("product.load_more_reviews")}
        </button>
      )}

      {showReviewModal && (
        <ProductReviewModal
          productId={productId}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
};

export default ProductReviews;
