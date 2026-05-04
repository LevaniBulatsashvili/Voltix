import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";

const getVisibleCount = (width: number) => {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
};

export const useVisibleCount = () => {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 640,
  );
  const debouncedWidth = useDebounce(width, 150);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return getVisibleCount(debouncedWidth);
};
