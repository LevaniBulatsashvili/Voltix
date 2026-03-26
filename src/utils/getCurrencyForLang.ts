export const getCurrencyFromLang = (lang: string): "USD" | "GEL" => {
  return lang === "ka" ? "GEL" : "USD";
};
