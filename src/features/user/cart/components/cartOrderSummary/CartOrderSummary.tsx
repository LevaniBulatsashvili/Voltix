import { Tag } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import PrimaryButton from "../../../../../components/button/PrimaryBtn";
import SummaryRow from "./SummaryRow";
import { formatCurrency } from "../../utils/formatCurrency";
import { useTranslation } from "react-i18next";

interface ICartOrderSummary {
  subtotal: number;
  discount?: number;
  deliveryFee?: number;
  currency: string;
}

const CartOrderSummary = ({
  subtotal,
  discount = 0,
  deliveryFee = 0,
  currency,
}: ICartOrderSummary) => {
  const { t } = useTranslation();
  const [promocode, setPromocode] = useState<string>("");

  const handlePromocodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value);
  };

  const onPromocode = () => {};

  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount + deliveryFee;

  return (
    <div className="flex flex-col border border-gray-300 rounded-xl p-5 space-y-6 h-fit">
      <h2 className="text-2xl font-bold">{t("cart.order_summary")}</h2>
      <div>
        <div className="border-b pb-4 border-gray-400 space-y-4">
          <SummaryRow
            label="cart.subtotal"
            value={formatCurrency(subtotal, currency)}
          />
          <SummaryRow
            label={`${t("cart.discount")} (${discount}%)`}
            value={`-${formatCurrency(discount, currency)}`}
            valueClass="text-red-600"
          />
          <SummaryRow
            label="cart.delivery_fee"
            value={formatCurrency(deliveryFee, currency)}
          />
        </div>

        <p className="my-5 flex justify-between text-2xl">
          {t("cart.total")}
          <span className="font-bold">{formatCurrency(total, currency)}</span>
        </p>
      </div>

      <div className="space-y-3 sm:flex gap-3">
        <div className="relative w-full ">
          <Tag
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value={promocode}
            onChange={handlePromocodeChange}
            placeholder={t("cart.add_promo_code")}
            className="w-full pl-10  pr-3 py-3 border text-black bg-gray-100 border-gray-300 rounded-full focus:outline-gray-400 focus:bg-gray-50"
          />
        </div>
        <PrimaryButton
          onClick={onPromocode}
          text="cart.apply"
          className="rounded-full! w-full sm:w-auto"
        />
      </div>
      <PrimaryButton
        text="cart.go_to_checkout"
        className="rounded-full! justify-self-center"
      />
    </div>
  );
};

export default CartOrderSummary;
