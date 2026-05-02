import type { IOrderItem } from "@/types/profile/profile";

interface OrderItem {
  item: IOrderItem;
  format: (value: number) => string;
}

const OrderItem = ({ item, format }: OrderItem) => {
  const total = item.total ?? item.price * item.quantity;

  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0">
      <span className="text-md">
        {item.product?.name ?? "Product"}
        <span className="inline-block  text-[11px] rounded px-1 py-0.5 ml-1.5">
          x{item.quantity}
        </span>
      </span>
      <span className="text-md  tabular-nums">{format(total)}</span>
    </div>
  );
};

export default OrderItem;
