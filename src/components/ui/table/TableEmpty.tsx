import { PackageSearch } from "lucide-react";
import { useTranslation } from "react-i18next";

const TableEmpty = ({ colSpan }: { colSpan: number }) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <PackageSearch className="size-14 opacity-60" />
          <p className="text-lg font-semibold">{t("common.no_data_found")}</p>
          <p className="text-md opacity-70">
            {t("common.try_adjusting_filters")}
          </p>
        </div>
      </td>
    </tr>
  );
};

export default TableEmpty;
