import type { ButtonHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface IPrimaryButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  onClick?: () => void;
}

const PrimaryButton = ({ text, className, ...props }: IPrimaryButton) => {
  const { t } = useTranslation();

  return (
    <button
      {...props}
      className={`bg-primary text-background font-semibold px-5 sm:px-8 py-3 rounded-lg hover:opacity-80 transition-colors duration-200 capitalize ${className ?? ""}`}
    >
      {t(text)}
    </button>
  );
};

export default PrimaryButton;
