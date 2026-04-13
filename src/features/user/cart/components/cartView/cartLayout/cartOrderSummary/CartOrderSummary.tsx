import { Tag } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import PrimaryButton from "@/components/button/PrimaryBtn";
import SummaryRow from "./SummaryRow";
import { useTranslation } from "react-i18next";
import { notify } from "@/lib/toast/toast";
import { useAppSelector } from "@/hooks/redux";
import { usePrice } from "../../../../hooks/usePrice";
import { useCreateOrder } from "../../../../hooks/useCreateOrder";

interface ICartOrderSummary {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}

const CartOrderSummary = ({
  total,
  subtotal,
  discount = 0,
  deliveryFee = 0,
}: ICartOrderSummary) => {
  const { currency } = usePrice();
  const { format } = usePrice();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { user } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const [promocode, setPromocode] = useState<string>("");
  const { mutate: order, isPending } = useCreateOrder();

  const handlePromocodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value);
  };
  const onPromocode = () => notify.info("Promo code feature coming soon!");

  const handlePurchase = async () => {
    order({
      profile_id: user!.id,
      currency,
      total_amount: total,
      delivery_fee: deliveryFee,
      discount,
      items: cartItems,
    });
  };

  const discountPercentage =
    subtotal > 0 ? Math.round((discount / subtotal) * 100) : 0;

  return (
    <div className="flex flex-col border border-gray-300 rounded-xl p-5 space-y-6 h-fit">
      <h2 className="text-2xl font-bold">{t("cart.order_summary")}</h2>
      <div>
        <div className="border-b pb-4 border-gray-400 space-y-4">
          <SummaryRow
            label="cart.subtotal"
            value={format(subtotal, false, true)}
          />
          <SummaryRow
            label={`${t("cart.discount")} (${discountPercentage}%)`}
            value={`-${format(discount, false, true)}`}
            valueClass="text-red-600"
          />
          <SummaryRow
            label="cart.delivery_fee"
            value={format(deliveryFee, false, true)}
          />
        </div>

        <p className="my-5 flex justify-between text-2xl">
          {t("cart.total")}
          <span className="font-bold">{format(total, false, true)}</span>
        </p>
      </div>

      <div className="space-y-3 sm:flex gap-3 sm:h-12">
        <div className="relative w-full ">
          <Tag className="absolute left-3 top-4  text-gray-400" size={20} />
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
        onClick={handlePurchase}
        text="cart.purchase"
        className={`rounded-full! justify-self-center ${isPending ? "opacity-60" : ""}`}
        disabled={isPending}
      />
    </div>
  );
};

export default CartOrderSummary;
