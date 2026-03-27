import { useState } from "react";
import CustomerCard from "../../../../../components/cards/CustomerCard";
import type { ICustomer } from "../../../../../types/customer";
import { User, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface IProductReviews {
  reviews: ICustomer[];
}

const INITIAL_VISIBLE = 4;
const LOAD_MORE_COUNT = 4;

const ProductReviews = ({ reviews }: IProductReviews) => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  const handleLoadMore = () =>
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));

  return (
    <div className="p-6 w-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold capitalize">
          {t("product.customer_reviews")} ({reviews.length})
        </h2>

        <div className="flex items-center gap-2">
          <button
            className="bg-gray-200 text-gray-700 w-30 px-6 py-3 rounded-full font-semibold flex items-center gap-1 hover:bg-gray-300 justify-center capitalize"
            onClick={toggleSortOrder}
          >
            <span>
              {sortOrder === "latest"
                ? t("product.latest")
                : t("product.oldest")}
            </span>
            <ChevronDown
              className={`ml-1 size-4 ${
                sortOrder === "latest" ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>

          <button className="bg-primary text-background rounded-full px-6 py-3 font-semibold hover:bg-primary/80 transition capitalize">
            {t("product.review")}
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto 
             scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent"
        style={{
          maxHeight: visibleCount > INITIAL_VISIBLE ? "44rem" : "auto",
        }}
      >
        {sortedReviews.slice(0, visibleCount).map((review) => (
          <CustomerCard key={review.id} customer={review} AvatarIcon={User} />
        ))}
      </div>

      {visibleCount < reviews.length && (
        <button
          onClick={handleLoadMore}
          className="self-center bg-gray-100 text-black px-9 py-3 rounded-full font-semibold hover:bg-gray-200 transition mt-4 sm:mt-6 capitalize"
        >
          {t("product-load more reviews")}
        </button>
      )}
    </div>
  );
};

export default ProductReviews;
