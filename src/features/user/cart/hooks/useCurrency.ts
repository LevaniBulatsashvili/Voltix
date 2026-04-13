import { useTranslation } from "react-i18next";
import { getCurrencyFromLang } from "@/utils/getCurrencyForLang";
import type { ICurrency } from "@/types/common/currency";

export const useCurrency = () => {
  const { i18n } = useTranslation();

  const currency = getCurrencyFromLang(i18n.language) as ICurrency;

  return currency;
};
