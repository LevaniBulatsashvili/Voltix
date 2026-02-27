import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Search } from "lucide-react";

export default function SearchBar({ delay = 700 }) {
  const disabled = false;

  const [inputValue, setInputValue] = useState(
    () => localStorage.getItem("searchTerm") ?? ""
  );

  const debouncedValue = useDebounce(inputValue, delay);

  useEffect(() => {
    const trimmed = debouncedValue.trim();
    localStorage.setItem("searchTerm", trimmed);

    console.log(trimmed);
  }, [debouncedValue]);

  return (
    <div className="relative w-full mb-2">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />

      <input
        className={`font-normal text-lg bg-neutral-50 border border-neutral-400 w-full py-2 pl-10 pr-4 focus:bg-white focus:outline-none ${
          disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : ""
        }`}
        placeholder="Search"
        value={inputValue}
        disabled={disabled}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}
