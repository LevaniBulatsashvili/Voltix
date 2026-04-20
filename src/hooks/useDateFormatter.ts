import { useTranslation } from "react-i18next";
import { normalizeLocale } from "@/utils/normalizeLocale";

const KA_MONTHS = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი",
];

const formatGeorgian = (d: Date): string => {
  const day = d.getDate();
  const month = KA_MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month}, ${year}`;
};

export const useFormatter = () => {
  const { i18n } = useTranslation();
  const locale = normalizeLocale(i18n.language);

  const formatDate = (date: string | Date): string => {
    const d = new Date(date);

    if (locale === "ka-GE") return formatGeorgian(d);

    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  };

  return { formatDate };
};
