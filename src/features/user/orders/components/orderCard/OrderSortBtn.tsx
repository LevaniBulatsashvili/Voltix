import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export type IOrderSortBy = "date" | "status";

interface IOrderSortBtn {
  sortBy: IOrderSortBy;
  onChangeSort: (sortBy: IOrderSortBy) => void;
}

const OrderSortBtn = ({ sortBy, onChangeSort }: IOrderSortBtn) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={() => onChangeSort(sortBy === "date" ? "status" : "date")}
      className="flex items-center gap-1 font-semibold capitalize"
    >
      {sortBy === "date"
        ? t("orders.sort_by_date")
        : t("orders.sort_by_status")}
      <ChevronDown
        size={18}
        className={`transition-transform duration-300 ${
          sortBy === "date" ? "rotate-0" : "rotate-180"
        }`}
      />
    </button>
  );
};

export default OrderSortBtn;
