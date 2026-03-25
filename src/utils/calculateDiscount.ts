function calculateDiscount(original: number, discountPercent: number) {
  const discounted = original * (1 - discountPercent / 100);
  return Math.round(discounted);
}

export default calculateDiscount;
