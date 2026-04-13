import { useMemo } from "react";
import { useAppSelector } from "@/hooks/redux";
import { usePrice } from "./usePrice";
import type { ICartItem } from "@/types/common/cart";

const calculateSubtotal = (items: ICartItem[]) =>
  items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

const calculateProductDiscount = (items: ICartItem[]) =>
  Math.round(
    items.reduce((acc, item) => {
      if (item.product.discount_percentage) {
        return (
          acc +
          (item.product.price *
            item.quantity *
            item.product.discount_percentage) /
            100
        );
      }
      return acc;
    }, 0),
  );

const calculateDeliveryFee = (baseFee: number) => baseFee;

export const useCartPricing = () => {
  const { items } = useAppSelector((state) => state.cart);
  const { convert, isLoading, currency } = usePrice();

  const pricing = useMemo(() => {
    if (!items || items.length === 0) {
      return {
        subtotal: 0,
        discount: 0,
        deliveryFee: 0,
        total: 0,
      };
    }

    const subtotalUSD = calculateSubtotal(items);
    const deliveryFeeUSD = calculateDeliveryFee(15);
    const discountAmountUSD = calculateProductDiscount(items);
    const totalUSD = subtotalUSD - discountAmountUSD + deliveryFeeUSD;

    return {
      subtotal: convert(subtotalUSD),
      discount: convert(discountAmountUSD),
      deliveryFee: convert(deliveryFeeUSD),
      total: convert(totalUSD),
    };
  }, [items, convert]);

  return { ...pricing, isLoading, currency };
};
