import { useTranslation } from "react-i18next";

interface IProductBtn {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const ProductBtn = ({
  text,
  onClick,
  disabled = false,
  className = "",
}: IProductBtn) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-6 py-2 capitalize ${className}`}
    >
      {t(text)}
    </button>
  );
};

export default ProductBtn;
