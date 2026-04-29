import type { IOrder, IOrderItem } from "@/types/profile/profile";
import { orderService } from "../../orders/service/orderService";
import { orderItemService } from "../../orders/service/orderItemService";
import type { ICreatePayload } from "@/types/common/api";
import { productService } from "@/features/public/product/services/productService";

export const createOrder = async ({
  profile_id: profileId,
  currency,
  total_amount: totalAmount,
  delivery_fee: deliveryFee,
  discount,
  items: cartItems,
}: Omit<IOrder, "id" | "status" | "created_at" | "updated_at">) => {
  if (!cartItems || cartItems.length === 0) throw new Error("Cart is empty");

  const orders = await orderService.create({
    profile_id: profileId,
    currency,
    status: "pending",
    total_amount: totalAmount,
    delivery_fee: deliveryFee,
    discount,
  });

  const orderItems: ICreatePayload<IOrderItem>[] = cartItems.map((item) => ({
    order_id: orders.id,
    product_id: item!.product!.id,
    quantity: item.quantity,
    price: item!.product!.price_final,
    total: item!.product!.price_final * item.quantity,
  }));

  await orderItemService.createMany(orderItems);

  cartItems.map(async ({ product, quantity }) => {
    await productService.update({
      id: product!.id,
      stock: product!.stock - quantity,
      total_sold: product!.total_sold + quantity,
    });
  });
};
