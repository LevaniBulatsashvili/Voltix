import type { ICartItem } from "../../../../types/Cart";
import type { IProduct } from "../../../../types/Product";
import type { RatesResponse } from "../api/fetchRates";

/**
 * Converts an amount from one currency to another using a single fetched rate.
 * Assumes rates are always relative to a base currency.
 */
export const convertCurrency = (
  amount: number,
  fromCurrency: IProduct["currency"],
  toCurrency: IProduct["currency"],
  rate: RatesResponse,
): number => {
  if (fromCurrency === toCurrency) return Math.round(amount);

  let converted: number;

  if (fromCurrency === rate.base && toCurrency === rate.quote) {
    converted = amount * rate.rate;
  } else if (fromCurrency === rate.quote && toCurrency === rate.base) {
    converted = amount / rate.rate;
  } else {
    throw new Error(
      `Unsupported currency conversion: ${fromCurrency} → ${toCurrency}`,
    );
  }

  return Math.round(converted); // round to nearest integer
};

// Recalculate subtotal in target currency
export const calculateSubtotal = (
  items: ICartItem[],
  targetCurrency: IProduct["currency"],
  rate: RatesResponse,
): number =>
  Math.round(
    items.reduce(
      (sum, item) =>
        sum +
        convertCurrency(
          item.product.price,
          item.product.currency,
          targetCurrency,
          rate,
        ) *
          item.quantity,
      0,
    ),
  );

// Recalculate product discounts
export const calculateProductDiscount = (
  items: ICartItem[],
  targetCurrency: IProduct["currency"],
  rate: RatesResponse,
): number =>
  Math.round(
    items.reduce((sum, item) => {
      const discountAmount =
        (item.product.price * (item.product.discount_percentage || 0)) / 100;
      return (
        sum +
        convertCurrency(
          discountAmount,
          item.product.currency,
          targetCurrency,
          rate,
        ) *
          item.quantity
      );
    }, 0),
  );

export const calculateCartDiscount = (
  subtotal: number,
  discountPercent: number,
): number => Math.round((subtotal * discountPercent) / 100);

export const calculateTotal = (
  subtotal: number,
  productDiscount: number,
  cartDiscount: number,
  deliveryFee: number,
): number =>
  Math.round(subtotal - productDiscount - cartDiscount + deliveryFee);

export const calculateDeliveryFee = (
  baseFee: number,
  fromCurrency: IProduct["currency"],
  toCurrency: IProduct["currency"],
  rate: RatesResponse,
): number => convertCurrency(baseFee, fromCurrency, toCurrency, rate);
