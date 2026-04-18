import type { UseQueryResult } from "@tanstack/react-query";
import SearchInput from "./SearchInput";
import { SearchResults } from "./SearchResults";
import type { IDataResponse } from "@/types/common/api";

interface ISearchBar<T> {
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  onEnter?: () => void;
  isSearchDisabled?: boolean;
  hasData?: boolean;
  placeholder?: string;
  searchInputClassName?: string;

  searchResultOptions?: {
    query?: UseQueryResult<IDataResponse<T>>;
    limit: number;
    onViewAll: () => void;
    renderItem: (item: T) => React.ReactNode;
  };

  className?: string;
}

export function SearchBar<T>({
  searchValue,
  onSearchValueChange,
  onEnter,
  isSearchDisabled,
  hasData,
  placeholder,
  searchInputClassName,

  searchResultOptions,

  className = "",
}: ISearchBar<T>) {
  return (
    <div className={`relative w-full ${className ?? "max-w-100 ml-auto"}`}>
      <SearchInput
        searchVal={searchValue}
        onSearchValueChange={onSearchValueChange}
        onEnter={onEnter}
        isSearchDisabled={isSearchDisabled}
        hasData={hasData}
        placeholder={placeholder}
        searchInputClassName={searchInputClassName}
      />

      {searchResultOptions && (
        <SearchResults
          query={searchResultOptions.query}
          limit={searchResultOptions.limit}
          onViewAll={searchResultOptions.onViewAll}
          renderItem={searchResultOptions.renderItem}
        />
      )}
    </div>
  );
}
