import { useState } from "react";

import { notify } from "@/lib/toast/toast";
import type { IPromoCode } from "@/types/profile/promoCode";
import { validatePromoCode } from "../services/validatePromoCode";
import { useTranslation } from "react-i18next";

export const usePromoCode = (total: number) => {
  const { t } = useTranslation();
  const [promoCode, setPromoCode] = useState<IPromoCode | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const discountAmount = promoCode
    ? Math.round((total * promoCode.discount_percentage) / 100)
    : 0;

  const finalTotal = total - discountAmount;

  const apply = async (code: string) => {
    if (!code.trim()) return notify.error(t("cart.enter_a_promo_code"));
    setIsValidating(true);

    try {
      const data = await validatePromoCode(code);
      setPromoCode(data);
      notify.success(
        t("cart.promo_applied", { percentage: data.discount_percentage }),
      );
    } catch (err: unknown) {
      setPromoCode(null);
      const message =
        err instanceof Error ? err.message : "cart.invalid_promo_code";
      notify.error(t(message));
    } finally {
      setIsValidating(false);
    }
  };

  const remove = () => {
    setPromoCode(null);
  };

  return { promoCode, discountAmount, finalTotal, isValidating, apply, remove };
};
