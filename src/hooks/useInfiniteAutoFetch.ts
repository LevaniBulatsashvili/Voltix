import { useEffect, useRef } from "react";

interface IUseInfiniteAutoFetch {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  rootMargin?: string;
}

export const useInfiniteAutoFetch = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  rootMargin = "200px",
}: IUseInfiniteAutoFetch) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(isFetchingNextPage);

  useEffect(() => {
    isFetchingRef.current = isFetchingNextPage;
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingRef.current) {
          fetchNextPage();
        }
      },
      { rootMargin },
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [fetchNextPage, hasNextPage, rootMargin]);
  return { observerRef };
};
