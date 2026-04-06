import { useEffect, useState } from "react";

type TFlickerType = "loading" | "error" | "empty" | null;

interface IUseFlickerOptions {
  flickerLoading?: boolean;
  flickerError?: boolean;
  flickerEmpty?: boolean;
  duration?: number;
  interval?: number;
}

export const useFlicker = ({
  flickerLoading,
  flickerError,
  flickerEmpty,
  duration = 2000,
  interval = 2000,
}: IUseFlickerOptions) => {
  const [flicker, setFlicker] = useState<TFlickerType>(null);

  useEffect(() => {
    let onTimeout: number | undefined;
    let offTimeout: number | undefined;

    const startFlicker = (type: TFlickerType) => {
      const flickerCycle = () => {
        queueMicrotask(() => setFlicker(type));

        offTimeout = window.setTimeout(() => {
          setFlicker(null);
          if (type && isFlickerActive(type))
            onTimeout = window.setTimeout(flickerCycle, interval);
        }, duration);
      };
      flickerCycle();
    };

    const isFlickerActive = (type: TFlickerType) => {
      switch (type) {
        case "loading":
          return !!flickerLoading;
        case "error":
          return !!flickerError;
        case "empty":
          return !!flickerEmpty;
        default:
          return false;
      }
    };

    if (flickerLoading) startFlicker("loading");
    else if (flickerError) startFlicker("error");
    else if (flickerEmpty) startFlicker("empty");

    return () => {
      if (onTimeout) clearTimeout(onTimeout);
      if (offTimeout) clearTimeout(offTimeout);
      setFlicker(null);
    };
  }, [flickerLoading, flickerError, flickerEmpty, duration, interval]);

  return flicker;
};
