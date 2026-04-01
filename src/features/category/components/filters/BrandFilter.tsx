import type { IBrand } from "../../../../types/product";
import type { TFunction } from "i18next";

interface IBrandFilter {
  t: TFunction;
  availableBrands: IBrand[];
  selectedBrands?: number[];
  onSelectedBrandsChange?: (brands: number[]) => void;
}

const BrandFilter = ({
  t,
  availableBrands,
  selectedBrands,
  onSelectedBrandsChange,
}: IBrandFilter) => {
  if (!availableBrands || availableBrands.length === 0) return null;

  const handleChange = (brandId: number, checked: boolean) => {
    const updatedBrands = checked
      ? [...(selectedBrands || []), brandId]
      : (selectedBrands || []).filter((b) => b !== brandId);
    onSelectedBrandsChange?.(updatedBrands);
  };

  return (
    <div className="py-4 border-t border-gray-300">
      <h3 className="text-sm font-semibold mb-2">{t("category.brands")}</h3>
      <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
        {availableBrands.map((brand) => (
          <label
            key={brand.id}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={selectedBrands?.includes(brand.id)}
              onChange={(e) => handleChange(brand.id, e.target.checked)}
              className="w-5 h-5 accent-primary"
            />
            <span className="text-sm">{brand.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
