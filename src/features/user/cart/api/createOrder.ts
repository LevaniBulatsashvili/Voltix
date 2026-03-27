import { supabase } from "../../../../lib/supabase";
import type { ICartItem } from "../../../../types/cart";
import type { ICurrency } from "../../../../types/currency";
import type { IOrderItem } from "../../../../types/profile";

export const createOrder = async (
  profileId: string,
  cartItems: ICartItem[],
  currency: ICurrency,
  totalAmount: number,
  deliveryFee: number,
  discount: number,
) => {
  try {
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: profileId,
          currency,
          status: "pending",
          total_amount: totalAmount,
          delivery_fee: deliveryFee,
          discount,
        },
      ])
      .select("id")
      .single();

    if (orderError || !orderData) throw orderError;

    const orderId = orderData.id;

    const orderItems: IOrderItem[] = cartItems.map((item) => ({
      order_id: orderId,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
      total: item.product.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    const updatePromises = cartItems.map(({ product, quantity }) =>
      supabase
        .from("products")
        .update({
          stock: product.stock - quantity,
          total_sold: product.total_sold + quantity,
        })
        .eq("id", product.id),
    );

    const results = await Promise.all(updatePromises);
    results.forEach(({ error }) => {
      if (error) throw error;
    });

    return orderId;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};
