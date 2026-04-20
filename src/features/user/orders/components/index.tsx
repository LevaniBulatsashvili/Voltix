import { useAppSelector } from "@/hooks/redux";
import { usePrice } from "../../cart/hooks/usePrice";
import { useFetchOrders } from "../hooks/ordersCRUD";
import OrderCard from "./orderCard";
import PageWrapper from "@/components/ui/PageWrapper";
import PaginatedGridSection from "@/components/ui/PaginatedGridSection";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { profile } = useAppSelector((state) => state.profile);
  const ordersQuery = useFetchOrders({
    page,
    limit: 6,
    filters: { eq: { profile_id: profile!.id } },
  });

  const { format } = usePrice();

  return (
    <PageWrapper className="xl:px-0">
      <PaginatedGridSection
        query={ordersQuery}
        title={t("orders.orders")}
        description="common.showing_products"
        onPageChange={setPage}
        renderItem={(order) => (
          <OrderCard key={order.id} order={order} format={format} />
        )}
        maxCols={3}
      />
    </PageWrapper>
  );
};

export default Orders;
