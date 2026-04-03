import AsyncBoundary from "../../../../components/feedback/AsyncBoundary";
import { useStepPagination } from "../../../../hooks/useStepPagination";
import type { IProductComment } from "../../../../types/product";
import ProductCommentsListSkeleton from "../productsSkeleton/ProductCommentsListSkeleton";
import ProductCommentsNavigation from "./ProductCommentNavigation";
import ProductCommentsList from "./ProductCommentsList";

interface IProductCommentsView {
  title: string;
  startIndex: number;
  visibleProducts: number;
  setStartIndex: (index: number) => void;
  productCommentsData?: {
    comments: IProductComment[];
    total: number;
  };
  commentsLoading: boolean;
  commentsError: Error | null;
}

const ProductCommentsView = ({
  title,
  productCommentsData,
  commentsLoading,
  commentsError,
  startIndex,
  visibleProducts,
  setStartIndex,
}: IProductCommentsView) => {
  const { prev, next, prevDisabled, nextDisabled } = useStepPagination({
    currentIndex: startIndex,
    totalItems: productCommentsData?.total || 0,
    visibleItems: visibleProducts,
    onChange: setStartIndex,
  });

  return (
    <div className="w-[90%] mx-auto mb-20 sm:mb-30">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 sm:mb-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold uppercase text-center sm:text-start">
          {title}
        </h2>
        <ProductCommentsNavigation
          onPrev={prev}
          onNext={next}
          prevDisabled={prevDisabled}
          nextDisabled={nextDisabled}
        />
      </div>

      <AsyncBoundary
        data={productCommentsData}
        isLoading={commentsLoading}
        error={commentsError}
        loadingFallback={
          <ProductCommentsListSkeleton count={visibleProducts} />
        }
        defaultFallbackOptions={{ className: "my-15 h-74 w-full" }}
      >
        {({ comments }) => (
          <ProductCommentsList
            productComments={comments}
            startIndex={startIndex}
          />
        )}
      </AsyncBoundary>
    </div>
  );
};

export default ProductCommentsView;
