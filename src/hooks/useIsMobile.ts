import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";

export const useIsMobile = (breakpoint = 768) => {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : breakpoint,
  );
  const debouncedWidth = useDebounce(width, 150);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return debouncedWidth < breakpoint;
};
