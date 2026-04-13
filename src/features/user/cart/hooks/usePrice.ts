import { useCurrency } from "./useCurrency";
import useFetchRates from "@/hooks/useFetchRates";

export const usePrice = () => {
  const currency = useCurrency();
  const { data: rates, isLoading } = useFetchRates();

  const convert = (usd: number) => {
    if (currency === "USD") return usd;
    const rate = rates?.[currency];
    return rate ? usd * rate : usd;
  };

  const format = (usd: number, reversed?: boolean, noConversion?: boolean) => {
    let value = convert(usd);
    if (noConversion) value = usd;

    const currencySymbols: Record<string, string> = {
      USD: "$",
      EUR: "€",
      GEL: "₾",
    };

    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

    let finalFormatted =
      currency === "GEL"
        ? formatted.replace("GEL", currencySymbols[currency])
        : formatted;

    if (reversed) finalFormatted = finalFormatted.slice(1) + finalFormatted[0];
    return finalFormatted;
  };

  return {
    currency,
    convert,
    format,
    isLoading,
  };
};
