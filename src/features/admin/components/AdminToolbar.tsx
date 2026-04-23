import { SearchBar } from "@/components/ui/search/SearchBar";
import { Select } from "@/components/ui/Select";

interface ISelectOption {
  value: string;
  label: string;
}

interface IAdminToolbar {
  searchValue: string;
  setSearchValue: (value: string) => void;
  hasData?: boolean;
  isSearchDisabled?: boolean;
  searchInputClassName?: string;

  selectDropdownOptions?: {
    selectValue: string;
    onSelect: (value: string) => void;
    selectOptions: ISelectOption[];
    selectBaseLabel?: string;
  };
}

const AdminToolbar = ({
  searchValue,
  setSearchValue,
  hasData,
  isSearchDisabled,
  searchInputClassName,
  selectDropdownOptions,
}: IAdminToolbar) => {
  return (
    <div className="flex gap-3 mb-4">
      <SearchBar
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        hasData={hasData}
        isSearchDisabled={isSearchDisabled}
        searchInputClassName={searchInputClassName}
      />
      {selectDropdownOptions && (
        <Select
          value={selectDropdownOptions.selectValue}
          onChange={selectDropdownOptions.onSelect}
          options={selectDropdownOptions.selectOptions}
          baseLabel={selectDropdownOptions.selectBaseLabel}
        />
      )}
    </div>
  );
};

export default AdminToolbar;
