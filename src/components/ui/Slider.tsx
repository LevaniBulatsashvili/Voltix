import { useSlider } from "@/features/public/search/hooks/useSlider";

interface ISlider {
  min: number;
  max: number;
  step?: number;

  value?: number;
  minValue?: number;
  maxValue?: number;

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

  return (
    <div className="relative h-10 w-full" ref={sliderRef}>
      <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full bg-primary/40 rounded" />

      {isRange ? (
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-primary/80 rounded"
          style={{
            left: `${percent(minValue!)}%`,
            width: `${percent(maxValue!) - percent(minValue!)}%`,
          }}
        />
      ) : (
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-primary/80 rounded"
          style={{ width: `${percent(value!)}%` }}
        />
      )}

      {isRange ? (
        <>
          <div
            onMouseDown={startDragRange("min")}
            onTouchStart={startDragRange("min")}
            className="absolute top-1/2 -translate-y-1/2 size-6 bg-primary border rounded-full cursor-pointer"
            style={{
              left: `calc(${percent(minValue!)}% - 12px)`,
            }}
          />

          <div
            onMouseDown={startDragRange("max")}
            onTouchStart={startDragRange("max")}
            className="absolute top-1/2 -translate-y-1/2 size-6 bg-primary border rounded-full cursor-pointer"
            style={{
              left: `calc(${percent(maxValue!)}% - 12px)`,
            }}
          />
        </>
      ) : (
        <div
          onMouseDown={startDragSingle}
          onTouchStart={startDragSingle}
          className="absolute top-1/2 -translate-y-1/2 size-6 bg-primary border rounded-full cursor-pointer"
          style={{
            left: `calc(${percent(value!)}% - 12px)`,
          }}
        />
      )}
    </div>
  );
};

export default Slider;
