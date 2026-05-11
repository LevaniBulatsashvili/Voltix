import { cn } from "@/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  className,
}: IProductsCommentsNavigation) => {
  const { t } = useTranslation();

  return (
    <div className={cn("flex gap-4", className)}>
      <button
        onClick={onPrev}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-40"
        disabled={prevDisabled}
        aria-label={t("common.previous")}
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      <button
        onClick={onNext}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-40"
        disabled={nextDisabled}
        aria-label={t("common.next")}
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
};

export default ProductsCommentsNavigation;
