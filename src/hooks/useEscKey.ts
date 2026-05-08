import { useEffect, useRef } from "react";

export const useEscKey = (onEsc: () => void) => {
  const onEscRef = useRef(onEsc);

  useEffect(() => {
    onEscRef.current = onEsc;
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscRef.current();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
};
