import { Sliders } from "lucide-react";
import { SelectDropdown } from "../../../../components/ui/SelectDropdown";
import type { ICategory, IMainCategory } from "../../../../types/product";
import type { TFunction } from "i18next";

interface IFilters {
  t: TFunction;
  mainCategories: IMainCategory[];
  selectedCategory: ICategory | null;
  onFilterCategory: (selectedCategory: ICategory | null) => void;
}

const Filters = ({
  t,
  mainCategories,
  selectedCategory,
  onFilterCategory,
}: IFilters) => {
  return (
    <div className="p-6 border border-gray-300 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold capitalize">
          {t("category.filters")}
        </h2>
        <Sliders size={24} />
      </div>

      <div className="py-3 border-y border-gray-300">
        {mainCategories.map(({ id, name, categories }) => (
          <SelectDropdown<ICategory>
            key={id}
            name={t(name)}
            items={categories}
            onSelect={onFilterCategory}
            selectedKey={selectedCategory ? String(selectedCategory.id) : null}
            getKey={(category) => String(category.id)}
            renderText={(category) => category.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;
