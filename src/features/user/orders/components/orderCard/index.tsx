import type { IOrder } from "@/types/profile/profile";
import OrderItem from "./OrdersItem";
import OrderStatus from "./OrdersStatus";
import { Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFormatter } from "@/hooks/useDateFormatter";

interface OrderCard {
  order: IOrder;
  format: (value: number) => string;
}

const OrderCard = ({ order, format }: OrderCard) => {
  const { t } = useTranslation();
  const { formatDate } = useFormatter();

  return (
    <div className="border border-primary/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-5 pt-5 ">
        <div className="flex justify-between items-start gap-3">
          <div>
            <span className="text-lg uppercase tracking-wide font-semibold">
              {t("orders.order")}
            </span>
            <h2 className="text-sm font-medium mt-0.5 opacity-80">
              #{order.id.slice(0, 8)}
            </h2>
            <p className="text-sm mt-1 opacity-80">{formatDate(order.date!)}</p>
          </div>
          <OrderStatus status={order.status} />
        </div>
      </div>

      <div className="px-5 py-4">
        {order.items?.map((item, idx) => (
          <OrderItem key={item.id ?? idx} item={item} format={format} />
        ))}

        <div className="flex justify-between items-center py-2 text-md opacity-85">
          <span className="flex items-center gap-1.5">
            <Truck />
            {t("orders.delivery_fee")}
          </span>
          <span>{format(order.delivery_fee)}</span>
        </div>
      </div>

      <div className="text-lg px-5 py-4 flex justify-between items-center">
        <span className="font-medium">{t("orders.total")}</span>
        <span className="font-medium tabular-nums">
          {format(order.total_amount)}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
