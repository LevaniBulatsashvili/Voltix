import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";

interface IPagination {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const ProductPagination = ({
  currentPage,
  totalPages,
  onChange,
}: IPagination) => {
  const { pages } = usePagination(currentPage, totalPages);

  return (
    <div className="flex justify-center mt-6 gap-2 items-center">
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="size-10 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={i}>...</span>
        ) : (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={`size-10 border rounded ${
              currentPage === page ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="size-10 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default ProductPagination;
