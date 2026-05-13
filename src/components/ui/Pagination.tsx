import { cn } from "@/utils/cn";
import { getPaginationPages } from "@/utils/getPaginationPages";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface IPagination {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  showInfo?: React.ReactNode;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onChange,
  showInfo,
  className,
}: IPagination) => {
  const { t } = useTranslation();
  const { pages } = getPaginationPages(currentPage, totalPages);

  const pageButtonClass = (isActive: boolean) =>
    cn(
      "size-8 sm:size-10 border rounded shrink-0",
      isActive ? "bg-primary text-background" : "hover:opacity-70",
    );

  return (
    <div
      className={cn(
        "flex justify-between flex-col-reverse sm:flex-row sm:items-center gap-4 mt-6",
        className,
      )}
    >
      {showInfo ? (
        <div className="text-md opacity-80">{showInfo}</div>
      ) : (
        <div />
      )}

      <div className="w-full sm:w-auto overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <div className="flex gap-1 sm:gap-2 items-center min-w-max">
          <button
            onClick={() => onChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="size-8 sm:size-10 border rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 shrink-0"
            aria-label={t("common.previous")}
          >
            <ChevronLeft size={18} />
          </button>

          {pages.map(({ key, value }) =>
            value === "..." ? (
              <span key={key} className="shrink-0 px-2">
                ...
              </span>
            ) : (
              <button
                key={key}
                onClick={() => onChange(value)}
                className={pageButtonClass(currentPage === value)}
              >
                {value}
              </button>
            ),
          )}

          <button
            onClick={() => onChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="size-8 sm:size-10 border rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 shrink-0"
            aria-label={t("common.next")}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
