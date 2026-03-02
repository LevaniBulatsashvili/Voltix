import { useState } from "react";

interface IToggleBtn {
  onToggle: () => void;
  className?: string;
  activeToggleClassName?: string;
  inactiveToggleClassName?: string;
  activeThumbClassName?: string;
  inactiveThumbClassName?: string;
}

const ToggleBtn = ({
  onToggle,
  className = "",
  activeToggleClassName = "",
  inactiveToggleClassName = "",
  activeThumbClassName = "",
  inactiveThumbClassName = "",
}: IToggleBtn) => {
  const [toggled, setToggled] = useState(false);

  const handleClick = () => {
    setToggled((prev) => !prev);
    onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        relative w-12.5 h-7 rounded-full cursor-pointer
        transition-all duration-400
        ${className}
        ${toggled ? activeToggleClassName : inactiveToggleClassName}
      `}
    >
      <div
        className={`
          absolute top-1/2 -translate-y-1/2
          size-6 rounded-full
          transition-all duration-400
          ${toggled ? `left-5.75 ${activeThumbClassName}` : `left-0.5 ${inactiveThumbClassName}`}
        `}
      />
    </button>
  );
};

export default ToggleBtn;
