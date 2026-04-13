import { ChevronLeft, ChevronRight } from "lucide-react";

interface IProductsCommentsNavigation {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
  className?: string;
}

const ProductsCommentsNavigation = ({
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
  className = "flex gap-4",
}: IProductsCommentsNavigation) => (
  <div className={className}>
    <button
      onClick={onPrev}
      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-40"
      disabled={prevDisabled}
    >
      <ChevronLeft className="w-6 h-6 text-gray-700" />
    </button>
    <button
      onClick={onNext}
      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-40"
      disabled={nextDisabled}
    >
      <ChevronRight className="w-6 h-6 text-gray-700" />
    </button>
  </div>
);
export default ProductsCommentsNavigation;
