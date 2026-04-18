import { Search } from "lucide-react";
import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

interface ISearchInput {
  searchVal: string;
  onSearchValueChange: (e: string) => void;
  onEnter?: () => void;
  isSearchDisabled?: boolean;
  hasData?: boolean;
  placeholder?: string;
  searchInputClassName?: string;
}

const SearchInput = ({
  isSearchDisabled = false,
  searchVal = "",
  onSearchValueChange,
  onEnter,
  hasData = true,
  placeholder = "header.search",
  searchInputClassName = "",
}: ISearchInput) => {
  const { t } = useTranslation();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSearchDisabled) return;
    if (e.key !== "Enter") return;
    if (!searchVal.trim()) return;
    e.preventDefault();
    if (onEnter) onEnter();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    if (isSearchDisabled) return;
    onSearchValueChange(e.target.value);
  };

  return (
    <>
      <Search className="absolute left-3 top-3 w-5 h-5 text-text pointer-events-none" />
      <input
        className={`font-normal text-lg text-text bg-white border border-primary/50 w-full py-2 pl-10 pr-4 focus:bg-white focus:outline-none placeholder:capitalize
          ${hasData ? "rounded-t-3xl" : "rounded-full "}
           ${isSearchDisabled ? "opacity-85" : ""} ${searchInputClassName}`}
        placeholder={t(placeholder)}
        value={searchVal}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </>
  );
};

export default SearchInput;
