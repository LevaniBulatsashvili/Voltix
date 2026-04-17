export const normalizeLocale = (lang: string) => {
  if (lang.startsWith("ka")) return "ka-GE";
  if (lang.startsWith("en")) return "en-US";
  return "en-US";
};
