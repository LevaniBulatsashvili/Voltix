export const usePagination = (currentPage: number, totalPages: number) => {
  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage <= 3) {
      pages.push(2, 3, 4, "...");
    } else if (currentPage >= totalPages - 2) {
      pages.push("...", totalPages - 3, totalPages - 2, totalPages - 1);
    } else {
      pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...");
    }

    pages.push(totalPages);

    return pages;
  };

  return {
    pages: getPages(),
  };
};
