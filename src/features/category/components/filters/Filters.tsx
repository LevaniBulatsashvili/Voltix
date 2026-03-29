import { useState } from "react";
import { Sliders, X } from "lucide-react";
import { SelectDropdown } from "../../../../components/ui/SelectDropdown";
import type { ICategory, IMainCategory } from "../../../../types/product";
import type { TFunction } from "i18next";
import PriceFilter from "./PriceFilter";

interface IFilters {
  t: TFunction;
  mainCategories: IMainCategory[];
  selectedCategory: ICategory | null;
  onFilterCategory: (selectedCategory: ICategory | null) => void;
  onPriceFilterChange?: (min: number, max: number) => void;
}

const Filters = ({
  t,
  mainCategories,
  selectedCategory,
  onFilterCategory,
  onPriceFilterChange,
}: IFilters) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="absolute right-6 md:right-11 lg:right-20 xl:hidden p-2 border rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <Sliders size={24} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/30 z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-23.5 right-0 h-full w-74 p-6 rounded-l-xl bg-background z-50 xl:max-h-fit xl:border xl:border-gray-400 xl:rounded-2xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          xl:static xl:translate-x-0 xl:w-74 xl:block
        `}
      >
        <div className="flex justify-between items-center mb-6 xl:hidden">
          <h2 className="text-xl font-bold capitalize">
            {t("category.filters")}
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="hidden xl:flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold capitalize">
            {t("category.filters")}
          </h2>
          <button className="xl:hidden" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="py-3 border-y border-gray-300">
          {mainCategories.map(({ id, name, categories }) => (
            <SelectDropdown<ICategory>
              key={id}
              name={t(name)}
              items={categories}
              onSelect={onFilterCategory}
              selectedKey={
                selectedCategory ? String(selectedCategory.id) : null
              }
              getKey={(category) => String(category.id)}
              renderText={(category) => category.name}
            />
          ))}
        </div>

        <PriceFilter t={t} onPriceFilterChange={onPriceFilterChange} />
      </div>
    </>
  );
};

export default Filters;
