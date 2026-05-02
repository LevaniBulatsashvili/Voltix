import { useState } from "react";
import InfoDropdown from "@/components/common/InfoDropdown";
import { useTranslation } from "react-i18next";

const DEMO_CODES = [
  { code: "WELCOME20", discount: "20%" },
  { code: "SAVE15", discount: "15%" },
  { code: "VOLTIX10", discount: "10%" },
];

const PromoCodeInfo = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <InfoDropdown
      title={t("cart.available_promo_codes")}
      className="absolute -top-7 -right-4"
      contentClassName="right-0 left-auto min-w-72"
    >
      <p className="text-xs font-semibold opacity-60 uppercase tracking-wide">
        {t("cart.demo_promo_codes")}
      </p>
      {DEMO_CODES.map(({ code, discount }) => (
        <div key={code} className="flex items-center justify-between gap-2">
          <code
            onClick={() => handleCopy(code)}
            className="text-xs bg-gray-100 px-2 py-1 rounded-md font-mono cursor-pointer hover:bg-gray-200 transition select-all"
            title={t("cart.click_to_copy")}
          >
            {copied === code ? `✓ ${t("cart.copied")}` : code}
          </code>
          <span className="text-xs text-green-600 font-medium whitespace-nowrap">
            {t("cart.discount_percentage", { percentage: discount })}
          </span>
        </div>
      ))}
    </InfoDropdown>
  );
};

export default PromoCodeInfo;
