import type { ICurrency } from "../types/currency";

export const getCurrencyFromLang = (lang: string): ICurrency => {
  return lang === "ka" ? "GEL" : lang === "en" ? "USD" : "EUR";
};
