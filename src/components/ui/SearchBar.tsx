import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SearchBar({ delay = 700 }) {
  const { t } = useTranslation();
  const disabled = false;

  const [inputValue, setInputValue] = useState(
    () => localStorage.getItem("searchTerm") ?? "",
  );

  const debouncedValue = useDebounce(inputValue, delay);

  useEffect(() => {
    const trimmed = debouncedValue.trim();
    localStorage.setItem("searchTerm", trimmed);
  }, [debouncedValue]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text pointer-events-none" />

      <input
        className={`font-normal text-lg text-text bg-white border border-primary/50 w-full py-2 pl-10 pr-4 focus:bg-white focus:outline-none placeholder:capitalize ${
          disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : ""
        }`}
        placeholder={t("search")}
        value={inputValue}
        disabled={disabled}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}
