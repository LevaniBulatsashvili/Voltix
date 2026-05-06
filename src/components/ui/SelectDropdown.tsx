import { cn } from "@/utils/cn";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { useTranslation } from "react-i18next";

interface ISelectDropdown<T> {
  name: string;
  items: T[];
  getKey: (item: T) => string;
  renderText: (item: T) => string;
  onSelect: (item: T | null) => void;
  selectedKey: string | null;
  className?: string;
}

export const SelectDropdown = <T,>({
  name,
  items,
  getKey,
  renderText,
  onSelect,
  selectedKey,
  className,
}: ISelectDropdown<T>) => {
  const { t } = useTranslation();
  const theme = useAppSelector((state) => state.theme.theme);
  const [open, setOpen] = useState(false);

  const handleSelect = (item: T) => {
    const key = getKey(item);
    onSelect(selectedKey === key ? null : item);
  };

  return (
    <div className={cn(className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full py-3 text-left flex justify-between items-center"
      >
        <span className="capitalize">{t(name)}</span>
        <ChevronRight
          size={16}
          className={cn(
            "transition-transform duration-100",
            open ? "rotate-90" : "rotate-0",
          )}
        />
      </button>

      {open && (
        <div className="rounded-lg shadow shadow-primary/10 p-1 max-h-54 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <div className="flex flex-wrap gap-2 p-2">
            {items.map((item) => {
              const key = getKey(item);
              const isSelected = selectedKey === key;
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => handleSelect(item)}
                  className={cn(
                    "border rounded-full px-3 py-2 cursor-pointer hover:opacity-80",
                    isSelected &&
                      (theme === "light"
                        ? "bg-green-600 text-white"
                        : "bg-indigo-700"),
                  )}
                >
                  {t(renderText(item))}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
