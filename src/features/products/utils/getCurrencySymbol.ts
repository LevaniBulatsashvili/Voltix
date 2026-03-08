const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GEL":
      return "₾";
    default:
      return "";
  }
};

export default getCurrencySymbol;
