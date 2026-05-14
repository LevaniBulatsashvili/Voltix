import type { IOrder } from "@/types/profile/profile";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ConfirmModal from "@/components/ui/modal/ConfirmModal";
import { useUpdateOrder } from "../../hooks/ordersCRUD";
import { OrderCardHeader } from "./orderCardHeader/OrderCardHeader";
import OrderCardBody from "./orderCardBody/OrderCardBody";
import OrderCardFooter from "./OrderCardFooter";
import { cn } from "@/utils/cn";

interface OrderCard {
  order: IOrder;
  format: (value: number) => string;
}

const OrderCard = ({ order, format }: OrderCard) => {
  const { t } = useTranslation();

  const [showCancel, setShowCancel] = useState(false);
  const { mutate: updateOrder } = useUpdateOrder();

  const handleCancel = () => {
    updateOrder(
      { id: order.id, status: "cancelled" },
      { onSuccess: () => setShowCancel(false) },
    );
  };

  return (
    <>
      <div
        className={cn(
          "border rounded-2xl overflow-hidden shadow-sm flex flex-col",
          order.status === "cancelled"
            ? "border-primary/30 bg-primary/5"
            : "border-primary/50",
        )}
      >
        <OrderCardHeader
          id={order.id}
          date={order.date!}
          status={order.status}
        />

        <OrderCardBody
          items={order.items}
          deliveryFee={order.delivery_fee}
          discount={order.discount}
          promoCode={order.promo_code}
          format={format}
          isCancelled={order.status === "cancelled"}
        />

        <OrderCardFooter
          total={order.total_amount}
          status={order.status}
          onCancel={() => setShowCancel(true)}
          format={format}
        />
      </div>

      <ConfirmModal
        open={showCancel}
        title={t("orders.cancel_order")}
        description={t("orders.cancel_order_confirm")}
        confirmText={t("orders.cancel_order")}
        cancelText={t("common.cancel")}
        variant="danger"
        onConfirm={handleCancel}
        onClose={() => setShowCancel(false)}
      />
    </>
  );
};

export default OrderCard;
