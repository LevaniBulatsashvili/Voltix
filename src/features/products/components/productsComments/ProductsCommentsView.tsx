import type { IProductCommentsResponse } from "../../../product/api/fetchProductComments";
import AsyncBoundary from "../../../../components/feedback/AsyncBoundary";
import { useStepPagination } from "../../../../hooks/useStepPagination";
import ProductsCommentsListSkeleton from "../productsSkeleton/ProductsCommentsListSkeleton";
import ProductsCommentsNavigation from "./ProductsCommentNavigation";
import ProductsCommentsList from "./ProductsCommentsList";

interface IProductsCommentsView {
  title: string;
  page: number;
  setPage: (index: number) => void;
  visibleProducts: number;
  productCommentsData?: IProductCommentsResponse;
  commentsLoading: boolean;
  commentsError: Error | null;
}

const ProductsCommentsView = ({
  title,
  productCommentsData,
  commentsLoading,
  commentsError,
  page,
  visibleProducts,
  setPage,
}: IProductsCommentsView) => {
  const { prev, next, prevDisabled, nextDisabled } = useStepPagination({
    currentPage: page,
    totalItems: productCommentsData?.total || 0,
    visibleItems: visibleProducts,
    onChange: setPage,
  });

  return (
    <div className="w-[90%] mx-auto mb-20 sm:mb-30">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 sm:mb-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold uppercase text-center sm:text-start">
          {title}
        </h2>
        <ProductsCommentsNavigation
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
          <ProductsCommentsListSkeleton count={visibleProducts} />
        }
        defaultFallbackOptions={{ className: "my-15 h-74 w-full" }}
      >
        {({ data: productComments }) => (
          <ProductsCommentsList productComments={productComments} />
        )}
      </AsyncBoundary>
    </div>
  );
};

export default ProductsCommentsView;
