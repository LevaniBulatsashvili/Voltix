import { supabase } from "@/lib/supabase";
import type { IOrderItem, IOrderRaw } from "@/types/profile";

export const createOrder = async ({
  profile_id: profileId,
  currency,
  total_amount: totalAmount,
  delivery_fee: deliveryFee,
  discount,
  items: cartItems,
}: IOrderRaw) => {
  if (!cartItems || cartItems.length === 0) throw new Error("Cart is empty");

  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        profile_id: profileId,
        currency,
        status: "pending",
        total_amount: totalAmount,
        delivery_fee: deliveryFee,
        discount,
      },
    ])
    .select("id")
    .single();

  if (orderError || !orderData) throw new Error("Failed to post order");

  const orderId = orderData.id;

  const orderItems: IOrderItem[] = cartItems.map((item) => ({
    order_id: orderId,
    product_id: item.product.id,
    quantity: item.quantity,
    price: item.product.price_final,
    total: item.product.price_final * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw new Error("Failed to post ordered products");

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
    if (error) throw new Error("Failed to update product");
  });

  return orderId;
};
