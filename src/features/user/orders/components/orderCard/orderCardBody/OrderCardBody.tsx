import { Tag, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import OrderItem from "./OrdersItem";
import type { IOrderItem } from "@/types/profile/profile";

interface IOrderCardBody {
  items?: IOrderItem[];
  deliveryFee: number;
  discount: number;
  promoCode?: string;
  format: (value: number) => string;
}

const OrderCardBody = ({
  items,
  deliveryFee,
  discount,
  promoCode,
  format,
}: IOrderCardBody) => {
  const { t } = useTranslation();

  return (
    <div className="px-5 py-4 flex-1">
      {items?.map((item, idx) => (
        <OrderItem key={item.id ?? idx} item={item} format={format} />
      ))}

      <div className="flex justify-between items-center py-2 text-md opacity-85">
        <span className="flex items-center gap-1.5">
          <Truck size={16} />
          {t("orders.delivery_fee")}
        </span>
        <span>{format(deliveryFee)}</span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between items-center py-2 text-md gap-2">
          <span className="flex items-center gap-1.5 text-green-500 min-w-0 flex-wrap">
            <Tag size={16} className="shrink-0" />
            {t("orders.discount")}
            {promoCode && (
              <span className="text-xs bg-red-50 border border-red-200 text-green-500 px-2 py-0.5 rounded-full font-mono shrink-0">
                {promoCode}
              </span>
            )}
          </span>
          <span className="shrink-0">-{format(discount)}</span>
        </div>
      )}
    </div>
  );
};

export default OrderCardBody;
