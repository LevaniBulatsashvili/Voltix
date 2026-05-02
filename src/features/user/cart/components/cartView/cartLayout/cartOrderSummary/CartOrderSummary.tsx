import { Tag, X } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import PrimaryButton from "@/components/button/PrimaryBtn";
import SummaryRow from "./SummaryRow";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/redux";
import { usePrice } from "../../../../hooks/usePrice";
import { useCreateOrder } from "../../../../hooks/useCreateOrder";
import { usePromoCode } from "@/features/user/cart/hooks/usePromoCode";
import PromoCodeInfo from "./PromoCodeInfo";

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
  const { currency, format } = usePrice();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { profile } = useAppSelector((state) => state.profile);
  const { t } = useTranslation();
  const [promocode, setPromocode] = useState<string>("");
  const { promoCode, discountAmount, finalTotal, isValidating, apply, remove } =
    usePromoCode(total);

  const { mutate: order, isPending } = useCreateOrder();

  const promoDiscount = discount + discountAmount;
  const promoDiscountPercentage =
    subtotal > 0 ? Math.round((promoDiscount / subtotal) * 100) : 0;

  const handlePromocodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value);
  };

  const handleRemove = () => {
    remove();
    setPromocode("");
  };

  const handlePurchase = async () => {
    order({
      profile_id: profile!.id,
      currency,
      total_amount: finalTotal,
      delivery_fee: deliveryFee,
      discount: promoDiscount,
      items: cartItems,
      promo_code: promoCode?.code,
    });
  };

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
            label={`${t("cart.discount")} (${promoDiscountPercentage}%)`}
            value={`-${format(promoDiscount, false, true)}`}
            valueClass="text-red-600"
          />
          <SummaryRow
            label="cart.delivery_fee"
            value={format(deliveryFee, false, true)}
          />
        </div>

        <p className="my-5 flex justify-between text-2xl">
          {t("cart.total")}
          <span className="font-bold">{format(finalTotal, false, true)}</span>
        </p>
      </div>

      <div className="space-y-3 sm:flex gap-3 sm:h-12 relative">
        <PromoCodeInfo />
        <div className="relative w-full">
          <Tag className="absolute left-3 top-4 text-gray-400" size={20} />
          <input
            type="text"
            value={promocode}
            onChange={handlePromocodeChange}
            disabled={!!promoCode}
            placeholder={t("cart.add_promo_code")}
            className="w-full pl-10 pr-3 py-3 border text-black bg-gray-100 border-gray-300 rounded-full focus:outline-gray-400 focus:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {promoCode && (
            <button
              onClick={handleRemove}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <PrimaryButton
          onClick={promoCode ? handleRemove : () => apply(promocode)}
          text={
            promoCode
              ? "cart.remove"
              : isValidating
                ? "cart.validating"
                : "cart.apply"
          }
          className={`rounded-full! w-full sm:w-auto ${promoCode ? "bg-red-500! hover:bg-red-600!" : ""}`}
          disabled={isValidating}
        />
      </div>

      {promoCode && (
        <p className="text-sm text-green-600 font-medium -mt-3">
          ✓ <span className="font-bold">{promoCode.code}</span> —{" "}
          {promoCode.discount_percentage}% {t("cart.discount_applied")}
        </p>
      )}

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
