import { useState } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

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
}

export function Select({
  value,
  onChange,
  options,
  baseLabel = "common.all",
  baseValue = "",
  className = "",
}: ISelect) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const displayLabel =
    options.find((o) => o.value === value)?.label ?? baseLabel;

  const isSelected = (val: string) => val === value;

  return (
    <div className={`relative bg-gray-50 text-black min-w-50 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full border border-primary/30 rounded-lg p-3 text-sm text-left flex justify-between items-center"
      >
        <span>{t(displayLabel)}</span>
      </button>

      {open && (
        <div className="absolute z-50 w-full border border-gray-400 bg-gray-50 max-h-50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <div
            onClick={() => {
              onChange(baseValue);
              setOpen(false);
            }}
            className={`px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 ${
              isSelected(baseValue) ? "bg-gray-100 font-medium" : ""
            }`}
          >
            {t(baseLabel)}
            {isSelected(baseValue) && <Check className="w-4 h-4" />}
          </div>

          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 ${
                isSelected(option.value) ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {t(option.label)}
              {isSelected(option.value) && (
                <Check className="w-4 h-4 text-green-600" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
