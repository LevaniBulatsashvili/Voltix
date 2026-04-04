import type { ICurrency } from "../../../../types/common/currency";

export interface IRate {
  base: "USD";
  quote: "GEL" | "EUR" | "USD";
  rate: number;
}
export type IRates = Record<string, number>;

const fetchRates = async (
  base: string = "USD",
  quotesArr: ICurrency[] = ["GEL", "EUR"],
): Promise<IRates> => {
  const quotes = quotesArr.join(",");

  const res = await fetch(
    `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${quotes}`,
  );

  if (!res.ok) throw new Error("Failed to fetch currency rates");

  const data: IRate[] = await res.json();

  const mapped = data.reduce<Partial<IRates>>((acc, curr) => {
    if (curr.quote === "GEL" || curr.quote === "EUR") {
      acc[curr.quote] = curr.rate;
    }
    return acc;
  }, {});

  if (!mapped.GEL || !mapped.EUR) {
    throw new Error("Missing required currency rates");
  }

  return mapped as IRates;
};

export default fetchRates;
