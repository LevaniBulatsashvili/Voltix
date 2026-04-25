export const usePagination = (currentPage: number, totalPages: number) => {
  const getPages = (): { key: string; value: number | "..." }[] => {
    const raw: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => ({
        key: String(i + 1),
        value: i + 1,
      }));
    }

    raw.push(1);

    if (currentPage <= 3) {
      raw.push(2, 3, 4, "...");
    } else if (currentPage >= totalPages - 2) {
      raw.push("...", totalPages - 3, totalPages - 2, totalPages - 1);
    } else {
      raw.push("...", currentPage - 1, currentPage, currentPage + 1, "...");
    }

    raw.push(totalPages);

    // Assign stable, unique keys
    let ellipsisCount = 0;
    return raw.map((value) => ({
      key: value === "..." ? `ellipsis-${ellipsisCount++}` : String(value),
      value,
    }));
  };

  return { pages: getPages() };
};