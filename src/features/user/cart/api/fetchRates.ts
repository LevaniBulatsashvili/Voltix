export interface RatesResponse {
  date: string;
  base: "USD" | "GEL" | "EUR";
  quote: "USD" | "GEL" | "EUR";
  rate: number;
}

const fetchRates = async (from: string, to: string): Promise<RatesResponse> => {
  const res = await fetch(
    `https://api.frankfurter.dev/v2/rates?base=${from}&quotes=${to}`,
  );

  if (!res.ok) throw new Error("Failed to fetch currency rates");

  const data = await res.json();

  return data[0];
};

export default fetchRates;
