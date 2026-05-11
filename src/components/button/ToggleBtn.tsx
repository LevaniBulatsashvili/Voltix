import { cn } from "@/utils/cn";
import { useState } from "react";

interface IToggleBtn {
  onToggle: () => void;
  isActive?: boolean;
  className?: string;
  activeToggleClassName?: string;
  inactiveToggleClassName?: string;
  activeThumbClassName?: string;
  inactiveThumbClassName?: string;
  "aria-label"?: string;
}

const ToggleBtn = ({
  onToggle,
  isActive,
  className,
  activeToggleClassName,
  inactiveToggleClassName,
  activeThumbClassName,
  inactiveThumbClassName,
  "aria-label": ariaLabel,
}: IToggleBtn) => {
  const [internalState, setInternalState] = useState(false);
  const toggled = isActive ?? internalState;

  const handleClick = () => {
    if (isActive === undefined) setInternalState((p) => !p);
    onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-pressed={toggled}
      className={cn(
        "relative w-12.5 h-7 rounded-full cursor-pointer transition-all duration-400",
        toggled ? activeToggleClassName : inactiveToggleClassName,
        className,
      )}
    >
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 size-6 rounded-full transition-all duration-400",
          toggled
            ? cn("left-5.75", activeThumbClassName)
            : cn("left-0.5", inactiveThumbClassName),
        )}
      />
    </button>
  );
};

export default ToggleBtn;
