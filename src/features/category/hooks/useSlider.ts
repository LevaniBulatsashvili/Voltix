import { useRef } from "react";

interface IUseSlider {
  min: number;
  max: number;
  step?: number;

  // 👇 supports both modes
  value?: number;
  minValue?: number;
  maxValue?: number;

  onChange?: (val: number) => void;
  onRangeChange?: (min: number, max: number) => void;
}

export const useSlider = ({
  min,
  max,
  step = 1,
  minValue,
  maxValue,
  onChange,
  onRangeChange,
}: IUseSlider) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const percent = (val: number) =>
    Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100));

  const clampStep = (val: number) => {
    const clamped = Math.max(min, Math.min(max, val));
    const stepped = Math.round(clamped / step) * step;
    return Number(stepped.toFixed(2));
  };

  const getClientX = (e: MouseEvent | TouchEvent) =>
    e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

  const calcValue = (clientX: number) => {
    if (!sliderRef.current) return min;

    const rect = sliderRef.current.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * (max - min) + min;

    return clampStep(raw);
  };

  const startDragSingle = () => {
    const move = (e: MouseEvent | TouchEvent) => {
      const val = calcValue(getClientX(e));
      onChange?.(val);
    };

    const stop = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", stop);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
    document.addEventListener("touchmove", move);
    document.addEventListener("touchend", stop);
  };

  const startDragRange = (type: "min" | "max") => () => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (minValue === undefined || maxValue === undefined) return;

      let val = calcValue(getClientX(e));

      if (type === "min") {
        if (val >= maxValue) val = maxValue - step;
        onRangeChange?.(val, maxValue);
      } else {
        if (val <= minValue) val = minValue + step;
        onRangeChange?.(minValue, val);
      }
    };

    const stop = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", stop);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
    document.addEventListener("touchmove", move);
    document.addEventListener("touchend", stop);
  };

  return {
    sliderRef,
    percent,
    startDragSingle,
    startDragRange,
  };
};
