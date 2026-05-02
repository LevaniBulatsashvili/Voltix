import type { IOrderStatus } from "@/types/profile/profile";
import { useTranslation } from "react-i18next";

interface IOrderCardFooter {
  total: number;
  status: IOrderStatus;
  format: (value: number) => string;
  onCancel: () => void;
}

const OrderCardFooter = ({
  total,
  status,
  format,
  onCancel,
}: IOrderCardFooter) => {
  const { t } = useTranslation();

  return (
    <div className="px-5 py-4 border-t border-primary/10">
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium">{t("orders.total")}</span>
        <span className="text-lg font-medium tabular-nums">
          {format(total)}
        </span>
      </div>

      {status === "pending" && (
        <button
          onClick={onCancel}
          className="mt-3 w-full py-2 rounded-xl border border-red-300 text-red-500 text-sm font-medium hover:bg-red-50 transition"
        >
          {t("orders.cancel_order")}
        </button>
      )}
    </div>
  );
};

export default OrderCardFooter;
