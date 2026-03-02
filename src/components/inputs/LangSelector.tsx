import "flag-icons/css/flag-icons.min.css";
import { useState, useRef, useEffect } from "react";

interface ILangSelector {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  languages: { value: string; language: string; code: string }[];
}

const LangSelector = ({ value, onChange, languages }: ILangSelector) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLang = languages.find((lang) => lang.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (langValue: string) => {
    onChange({ target: { value: langValue } });
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1 border rounded shadow cursor-pointer text-primary hover:bg-hover transition"
      >
        {selectedLang && (
          <span className={`fi fi-${selectedLang.code} size-4`}></span>
        )}
        <span>{selectedLang?.language}</span>
      </button>

      {open && (
        <ul className="absolute mt-1 w-full  border rounded shadow-lg z-50 max-h-60 overflow-auto">
          {languages.map((lang) => (
            <li
              key={lang.value}
              onClick={() => handleSelect(lang.value)}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer text-primary bg-background hover:bg-background/80"
            >
              <span className={`fi fi-${lang.code} size-4`}></span>
              <span>{lang.language}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LangSelector;
