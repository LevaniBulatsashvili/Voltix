import { useMemo } from "react";
import useFetchRates from "./useFetchRates";
import {
  calculateDeliveryFee,
  calculateProductDiscount,
  calculateSubtotal,
} from "../utils/cartProductCalcs";
import { useAppSelector } from "../../../../hooks/redux";

export const useCartPricing = (currency: "USD" | "GEL") => {
  const { items } = useAppSelector((state) => state.cart);

  const { data: rates, isLoading } = useFetchRates("GEL", "USD");

  const pricing = useMemo(() => {
    if (!rates || items.length === 0) {
      return {
        subtotal: 0,
        discount: 0,
        deliveryFee: 0,
        total: 0,
      };
    }

    const subtotal = calculateSubtotal(items, currency, rates);
    const discount = calculateProductDiscount(items, currency, rates);
    const deliveryFee = calculateDeliveryFee(15, "USD", currency, rates);

    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount + deliveryFee;

    return { subtotal, discount, deliveryFee, total };
  }, [items, rates, currency]);

  return { ...pricing, isLoading };
};
