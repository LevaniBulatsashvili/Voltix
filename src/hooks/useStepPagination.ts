import { useCallback } from "react";

interface IPaginationStep {
  currentPage: number;
  totalItems: number;
  visibleItems: number;
  onChange: (index: number) => void;
}

export const useStepPagination = ({
  currentPage,
  totalItems,
  visibleItems,
  onChange,
}: IPaginationStep) => {
  const prev = useCallback(
    () => onChange(Math.max(currentPage - 1, 0)),
    [currentPage, onChange],
  );
  const next = useCallback(
    () => onChange(Math.min(currentPage + 1, totalItems - visibleItems)),
    [currentPage, onChange, totalItems, visibleItems],
  );

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage * 3 >= totalItems;

  return { prev, next, prevDisabled, nextDisabled };
};
