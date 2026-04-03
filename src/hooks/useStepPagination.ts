import { useCallback } from "react";

interface IPaginationStep {
  currentIndex: number;
  totalItems: number;
  visibleItems: number;
  onChange: (index: number) => void;
}

export const useStepPagination = ({
  currentIndex,
  totalItems,
  visibleItems,
  onChange,
}: IPaginationStep) => {
  const prev = useCallback(
    () => onChange(Math.max(currentIndex - 1, 0)),
    [currentIndex, onChange],
  );
  const next = useCallback(
    () => onChange(Math.min(currentIndex + 1, totalItems - visibleItems)),
    [currentIndex, onChange, totalItems, visibleItems],
  );

  const prevDisabled = currentIndex === 0;
  const nextDisabled = currentIndex >= totalItems - visibleItems;

  return { prev, next, prevDisabled, nextDisabled };
};
