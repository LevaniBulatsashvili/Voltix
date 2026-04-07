import { useState } from "react";
import ProductCommentCard from "../../../../../components/cards/ProductCommentCard";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useInfiniteFetchProductComments } from "../../../hooks/productCommentCRUD";
import Spinner from "../../../../../components/feedback/Spinner";
import { useInfiniteFlatten } from "../../../../../hooks/useInfiniteFlatten"; // adjust path

interface IProductReviews {
  productId: number;
}

const ProductReviews = ({ productId }: IProductReviews) => {
  const { t } = useTranslation();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const {
    data: productCommentsQuery,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    error,
  } = useInfiniteFetchProductComments({
    limit: 2,
    sort: [
      { field: "created_at", ascending: sortOrder === "newest" ? true : false },
    ],
    filters: { eq: { product_id: productId } },
  });

  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));

  const { items: allComments, total: totalComments } =
    useInfiniteFlatten(productCommentsQuery);

  return (
    <div className="p-6 w-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold capitalize">
          {t("product.customer_reviews")} ({totalComments})
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

          <button className="bg-primary text-background rounded-full px-6 py-3 font-semibold hover:bg-primary/80 transition capitalize">
            {t("product.review")}
          </button>
        </div>
      </div>

      {error ? (
        <div className="text-red-600 capitalize">
          {t("product.load_more_reviews")}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allComments.map((comment) => (
            <ProductCommentCard key={comment.id} productComment={comment} />
          ))}
        </div>
      )}

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

      {isFetching && <Spinner />}
    </div>
  );
};

export default ProductReviews;
