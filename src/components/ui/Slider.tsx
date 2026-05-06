import { cn } from "@/utils/cn";
import { useSlider } from "@/features/public/search/hooks/useSlider";

interface ISlider {
  min: number;
  max: number;
  step?: number;
  value?: number;
  minValue?: number;
  maxValue?: number;
  className?: string;
  onChange?: (val: number) => void;
  onRangeChange?: (min: number, max: number) => void;
}

const Slider = ({
  min,
  max,
  step = 1,
  value,
  minValue,
  maxValue,
  className,
  onChange,
  onRangeChange,
}: ISlider) => {
  const { sliderRef, percent, startDragSingle, startDragRange } = useSlider({
    min,
    max,
    step,
    value,
    minValue,
    maxValue,
    onChange,
    onRangeChange,
  });

  const isRange = minValue !== undefined && maxValue !== undefined;

  const thumbClasses =
    "absolute top-1/2 -translate-y-1/2 size-6 bg-primary border-2 border-white shadow-sm rounded-full cursor-pointer hover:scale-110 transition-transform active:scale-95";

  return (
    <div
      className={cn("relative h-10 w-full touch-none", className)}
      ref={sliderRef}
    >
      <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full bg-primary/20 rounded-full" />

      {isRange ? (
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-primary rounded-full"
          style={{
            left: `${percent(minValue!)}%`,
            width: `${percent(maxValue!) - percent(minValue!)}%`,
          }}
        />
      ) : (
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-primary rounded-full"
          style={{ width: `${percent(value!)}%` }}
        />
      )}

      {isRange ? (
        <>
          <div
            onMouseDown={startDragRange("min")}
            onTouchStart={startDragRange("min")}
            className={cn(thumbClasses)}
            style={{ left: `calc(${percent(minValue!)}% - 12px)` }}
          />
          <div
            onMouseDown={startDragRange("max")}
            onTouchStart={startDragRange("max")}
            className={cn(thumbClasses)}
            style={{ left: `calc(${percent(maxValue!)}% - 12px)` }}
          />
        </>
      ) : (
        <div
          onMouseDown={startDragSingle}
          onTouchStart={startDragSingle}
          className={cn(thumbClasses)}
          style={{ left: `calc(${percent(value!)}% - 12px)` }}
        />
      )}
    </div>
  );
};

export default Slider;
