import { useEffect, useRef, useState } from "react";

type TFlickerType = "loading" | "error" | "empty" | null;

interface IUseFlickerOptions {
  flickerLoading?: boolean;
  flickerError?: boolean;
  flickerEmpty?: boolean;
  duration?: number;
  interval?: number;
}

function getActiveFlickerType(
  loading?: boolean,
  error?: boolean,
  empty?: boolean,
): TFlickerType {
  if (loading) return "loading";
  if (error) return "error";
  if (empty) return "empty";
  return null;
}

export const useFlicker = ({
  flickerLoading,
  flickerError,
  flickerEmpty,
  duration = 2000,
  interval = 2000,
}: IUseFlickerOptions) => {
  const [flicker, setFlicker] = useState<TFlickerType>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const activeType = getActiveFlickerType(
      flickerLoading,
      flickerError,
      flickerEmpty,
    );

    if (!activeType) {
      const t = window.setTimeout(() => setFlicker(null), 0);
      return () => clearTimeout(t);
    }

    let onTimeout: number | undefined;
    let offTimeout: number | undefined;

    const flickerCycle = () => {
      if (!mountedRef.current) return;
      setFlicker(activeType);

      offTimeout = window.setTimeout(() => {
        if (!mountedRef.current) return;
        setFlicker(null);

        if (
          getActiveFlickerType(flickerLoading, flickerError, flickerEmpty) ===
          activeType
        )
          onTimeout = window.setTimeout(flickerCycle, interval);
      }, duration);
    };

    flickerCycle();

    return () => {
      clearTimeout(onTimeout);
      clearTimeout(offTimeout);
    };
  }, [flickerLoading, flickerError, flickerEmpty, duration, interval]);

  return flicker;
};
