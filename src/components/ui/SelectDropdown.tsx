import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import type { TFunction } from "i18next";

interface ISelectDropdown<T> {
  t: TFunction;
  name: string;
  items: T[];
  getKey: (item: T) => string;
  renderText: (item: T) => string;
  onSelect: (item: T | null) => void;
  selectedKey: string | null;
  className?: string;
}

export const SelectDropdown = <T,>({
  t,
  name,
  items,
  getKey,
  renderText,
  onSelect,
  selectedKey,
  className = "",
}: ISelectDropdown<T>) => {
  const { theme } = useAppSelector((state) => state.theme);
  const [open, setOpen] = useState(false);

  const handleSelect = (item: T) => {
    const key = getKey(item);
    const newSelectedKey = selectedKey === key ? null : key;
    onSelect(
      newSelectedKey
        ? items.find((i) => getKey(i) === newSelectedKey) || null
        : null,
    );
  };

  return (
    <div className={`${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full py-3 text-left flex justify-between items-center"
      >
        <span className="capitalize">{t(name)}</span>
        <ChevronRight
          size={16}
          className={`transition-transform duration-100 ${open ? "rotate-90" : "rotate-0"}`}
        />
      </button>

      {open && (
        <div className="rounded-lg shadow shadow-primary/10 p-1 max-h-54 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <div className="flex flex-wrap gap-2 p-2">
            {items.map((item) => {
              const isSelected = selectedKey === getKey(item);
              return (
                <div
                  key={getKey(item)}
                  onClick={() => handleSelect(item)}
                  className={`border rounded-full px-3 py-2 cursor-pointer hover:opacity-80 ${
                    isSelected
                      ? theme === "light"
                        ? "bg-green-600 text-white"
                        : "bg-indigo-700"
                      : ""
                  }`}
                >
                  {t(renderText(item))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
