import { cn } from "@/utils/cn";
import { useTranslation } from "react-i18next";

interface ISummaryRow {
  label: string;
  value: string | number;
  currency?: "USD" | "GEL";
  summaryClass?: string;
  valueClass?: string;
}

const SummaryRow = ({
  label,
  value,
  summaryClass,
  valueClass,
}: ISummaryRow) => {
  const { t } = useTranslation();

  return (
    <p className={cn("flex justify-between text-xl opacity-80", summaryClass)}>
      {t(label)}

      <span className={cn("font-bold opacity-100", valueClass)}>{value}</span>
    </p>
  );
};

export default SummaryRow;
