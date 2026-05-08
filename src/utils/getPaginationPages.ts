interface PaginationPage {
  key: string;
  value: number | "...";
}

interface PaginationResult {
  pages: PaginationPage[];
}

export const getPaginationPages = (
  currentPage: number,
  totalPages: number,
): PaginationResult => {
  const pages: PaginationPage[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push({ key: `page-${i}`, value: i });
    }
    return { pages };
  }

  pages.push({ key: "page-1", value: 1 });
  if (currentPage > 3) pages.push({ key: "start-ellipsis", value: "..." });

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push({ key: `page-${i}`, value: i });
  }

  if (currentPage < totalPages - 2)
    pages.push({ key: "end-ellipsis", value: "..." });
  pages.push({ key: `page-${totalPages}`, value: totalPages });

  return { pages };
};
