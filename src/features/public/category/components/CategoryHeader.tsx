import { memo } from "react";
import { useTranslation } from "react-i18next";

interface ICategoryHeader {
  categoryName: string;
  total?: number;
}

const CategoryHeader = ({ categoryName, total }: ICategoryHeader) => {
  const { t } = useTranslation();

  console.log("category header");
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 py-8">
      <h1 className="text-2xl sm:text-4xl font-bold">
        {t(`common.${categoryName}`)}
      </h1>
      <p className="flex gap-2 text-2xl sm:text-4xl font-semibold">
        {t("category.total")} <span>{total}</span>
      </p>
    </div>
  );
};
CategoryHeader.displayName = "CategoryHeader";

export default memo(CategoryHeader);
