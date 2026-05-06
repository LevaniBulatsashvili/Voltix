import { cn } from "@/utils/cn";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface ISelectOption {
  value: string;
  label: string;
}

interface ISelect {
  value: string;
  onChange: (value: string) => void;
  options: ISelectOption[];
  baseLabel?: string;
  baseValue?: string;
  className?: string;
  selectBtnClassName?: string;
}

export function Select({
  value,
  onChange,
  options,
  baseLabel = "",
  baseValue = "",
  className,
  selectBtnClassName,
}: ISelect) {
  const [open, setOpen] = useState(false);

  const displayLabel =
    options.find((o) => o.value === value)?.label ?? baseLabel;
  const isSelected = (val: string) => val === value;

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  const optionClass = (val: string) =>
    cn(
      "px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 w-full text-left",
      isSelected(val) && "bg-gray-100 font-medium",
    );

  return (
    <div
      className={cn(
        "relative bg-gray-50 text-black min-w-35 sm:min-w-50 rounded-lg",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "w-full border border-primary/30 rounded-lg p-3 text-sm text-left flex justify-between items-center",
          selectBtnClassName,
        )}
      >
        <span>{displayLabel}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform duration-100",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 w-full border border-gray-400 bg-gray-50 max-h-50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <button
            className={optionClass(baseValue)}
            onClick={() => handleSelect(baseValue)}
          >
            {baseLabel}
            {isSelected(baseValue) && <Check className="w-4 h-4" />}
          </button>

          {options.map((option) => (
            <button
              key={option.value}
              className={optionClass(option.value)}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
              {isSelected(option.value) && (
                <Check className="w-4 h-4 text-green-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
