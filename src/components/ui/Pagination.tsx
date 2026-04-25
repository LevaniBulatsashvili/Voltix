import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";

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
  className = "",
}: IPagination) => {
  const { pages } = usePagination(currentPage, totalPages);

  return (
    <div
      className={`flex justify-between flex-col-reverse sm:flex-row sm:items-center gap-4 mt-6 ${className}`}
    >
      {showInfo ? (
        <div className="text-md opacity-80">{showInfo}</div>
      ) : (
        <div />
      )}

      <div className="w-full sm:w-auto overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <div className="flex gap-2 items-center min-w-max">
          <button
            onClick={() => onChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="size-10 border rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 shrink-0"
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
                className={`size-10 border rounded shrink-0 ${
                  currentPage === value
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {value}
              </button>
            ),
          )}

          <button
            onClick={() => onChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="size-10 border rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 shrink-0"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
