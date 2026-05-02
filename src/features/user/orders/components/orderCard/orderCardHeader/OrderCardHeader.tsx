import type { IOrderStatus } from "@/types/profile/profile";
import { Check, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";
import OrderStatus from "./OrdersStatus";
import { useFormatter } from "@/hooks/useDateFormatter";
import { useCopyToClipboard } from "@/hooks/useCopyToClipBoard";

interface IOrderCardHeader {
  id: string;
  date: string;
  status: IOrderStatus;
}

export const OrderCardHeader = (order: IOrderCardHeader) => {
  const { t } = useTranslation();
  const { formatDate } = useFormatter();
  const { copy, isCopied } = useCopyToClipboard();

  return (
    <div className="px-5 pt-5">
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <span className="text-base sm:text-lg uppercase tracking-wide font-semibold">
            {t("orders.order")}
          </span>
          <button
            onClick={() => copy(order.id)}
            className="flex items-center gap-1 mt-0.5 opacity-80 hover:opacity-100 transition group"
            title={t("orders.copy_id")}
          >
            <h2 className="text-sm font-medium truncate">
              #{order.id.slice(0, 8)}
            </h2>
            {isCopied(order.id) ? (
              <Check size={12} className="text-green-500 shrink-0" />
            ) : (
              <Copy
                size={12}
                className="opacity-0 group-hover:opacity-60 transition shrink-0"
              />
            )}
          </button>
          <p className="text-sm mt-1 opacity-80">{formatDate(order.date!)}</p>
        </div>
        <div className="shrink-0">
          <OrderStatus
            status={order.status}
            statusText={t(`orders.${order.status}`)}
          />
        </div>
      </div>
    </div>
  );
};
