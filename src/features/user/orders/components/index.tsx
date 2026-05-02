import { useAppSelector } from "@/hooks/redux";
import { usePrice } from "../../cart/hooks/usePrice";
import { useFetchOrders } from "../hooks/ordersCRUD";
import OrderCard from "./orderCard";
import PageWrapper from "@/components/ui/PageWrapper";
import PaginatedGridSection from "@/components/ui/PaginatedGridSection";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { IOrderSortBy } from "./orderCard/OrderSortBtn";
import OrderSortBtn from "./orderCard/OrderSortBtn";

const Orders = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { profile } = useAppSelector((state) => state.profile);
  const [sortBy, setSortBy] = useState<IOrderSortBy>("date");

  const ordersQuery = useFetchOrders({
    page,
    limit: 6,
    filters: { eq: { profile_id: profile!.id } },
    sort: [{ field: sortBy, ascending: sortBy !== "date" }],
    selectField:
      "*, items:order_items(*, product:products(id, name, thumbnail))",
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
        className="min-h-[90dvh]"
        productGridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        sortOptions={{
          sortBy: "created_at",
          onChangeSort: () => {},
          renderSort: (
            <OrderSortBtn
              sortBy={sortBy}
              onChangeSort={(by) => {
                setSortBy(by);
                setPage(1);
              }}
            />
          ),
        }}
      />
    </PageWrapper>
  );
};

export default Orders;
