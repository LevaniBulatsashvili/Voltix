import type { IRates } from "../api/fetchRates";

export const convertPrice = (usd: number, currency: string, rates: IRates) => {
  if (currency === "USD") return usd;
  return usd * (rates?.[currency] ?? 1);
};
