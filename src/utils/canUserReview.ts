import type { IComment } from "../types/product";
import type { IOrder } from "../types/profile";

export const canUserReview = (
  userId: string | undefined,
  orders: IOrder[] | undefined,
  productId: number,
  comments: IComment[] | undefined,
) => {
  if (!userId || !orders) return false;

  const hasDeliveredOrder = orders.some(
    (order) =>
      order.status === "delivered" &&
      order.items.some((item) => item.product_id === productId),
  );

  const alreadyReviewed = comments?.some((c) => c.user_id === userId);

  return hasDeliveredOrder && !alreadyReviewed;
};
