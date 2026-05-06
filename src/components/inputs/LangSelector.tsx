import "flag-icons/css/flag-icons.min.css";
import { useState, useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import type { ILanguage } from "@/types/header";

interface ILangSelector {
  value: string;
  onChange: (value: string) => void;
  languages: ILanguage[];
}

const LangSelector = ({ value, onChange, languages }: ILangSelector) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setOpen(false));

  const selectedLang = languages.find((lang) => lang.value === value);

  const handleSelect = (langValue: string) => {
    onChange(langValue);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-1 border rounded shadow cursor-pointer text-background hover:bg-hover/50 transition bg-primary"
      >
        {selectedLang && (
          <span className={`fi fi-${selectedLang.code} size-4`} />
        )}
        <span className="uppercase font-semibold">
          {selectedLang?.language}
        </span>
      </button>

      {open && (
        <ul className="absolute mt-1 w-full border rounded shadow-lg z-50 max-h-60 overflow-auto uppercase">
          {languages.map((lang) => (
            <li key={lang.value}>
              <button
                onClick={() => handleSelect(lang.value)}
                className="w-full flex items-center gap-2 px-3 py-2 cursor-pointer text-background bg-primary border-b last:border-b-0 transition duration-200 hover:brightness-110 hover:drop-shadow-sm"
              >
                <span className={`fi fi-${lang.code} size-4`} />
                <span>{lang.language}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LangSelector;
