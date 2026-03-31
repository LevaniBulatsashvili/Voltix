// SpecFilter.tsx
import type { ISpecs } from "../../../../types/product";
import type { TFunction } from "i18next";

interface ISpecFilter {
  t: TFunction;
  availableSpecs: ISpecs[];
  selectedSpecs?: ISpecs[];
  onChange?: (specs: ISpecs[]) => void;
}

const SpecFilter = ({
  t,
  availableSpecs,
  selectedSpecs = [],
  onChange,
}: ISpecFilter) => {
  const groupedSpecs = availableSpecs.reduce<Record<string, ISpecs[]>>(
    (acc, spec) => {
      if (!acc[spec.spec]) acc[spec.spec] = [];
      acc[spec.spec].push(spec);
      return acc;
    },
    {},
  );

  const toggleSpec = (spec: ISpecs, checked: boolean) => {
    let updated: ISpecs[];

    if (checked) {
      updated = [...selectedSpecs, spec];
    } else {
      updated = selectedSpecs.filter((s) => s.id !== spec.id);
    }

    onChange?.(updated);
  };

  return (
    <div className="py-4 border-t border-gray-300">
      <h3 className="text-sm font-semibold mb-2">{t("category.specs")}</h3>

      <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
        {Object.entries(groupedSpecs).map(([specName, values]) => (
          <div key={specName}>
            <p className="text-xs font-semibold mb-1 uppercase text-gray-500">
              {specName}
            </p>

            <div className="flex flex-col gap-1">
              {values.map((spec) => (
                <label
                  key={spec.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSpecs.some((s) => s.id === spec.id)}
                    onChange={(e) => toggleSpec(spec, e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm">{spec.value}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecFilter;
