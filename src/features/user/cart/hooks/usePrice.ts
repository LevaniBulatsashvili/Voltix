import { useCallback, useMemo } from "react";
import { useCurrency } from "./useCurrency";
import useFetchRates from "@/hooks/useFetchRates";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GEL: "₾",
};

export const usePrice = () => {
  const currency = useCurrency();
  const { data: rates, isLoading } = useFetchRates();

  const convert = useCallback(
    (usd: number) => {
      if (currency === "USD") return usd;
      const rate = rates?.[currency];
      return rate ? usd * rate : usd;
    },
    [currency, rates],
  );

  const formatter = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }, [currency]);

  const format = useCallback(
    (usd: number, reversed?: boolean, noConversion?: boolean) => {
      const value = noConversion ? usd : convert(usd);

      const formatted = formatter.format(value);

      let finalFormatted =
        currency === "GEL"
          ? formatted.replace("GEL", CURRENCY_SYMBOLS[currency])
          : formatted;

      if (reversed)
        finalFormatted = finalFormatted.slice(1) + finalFormatted[0];

      return finalFormatted;
    },
    [currency, convert, formatter],
  );

  return useMemo(
    () => ({
      currency,
      convert,
      format,
      isLoading,
    }),
    [currency, convert, format, isLoading],
  );
};
