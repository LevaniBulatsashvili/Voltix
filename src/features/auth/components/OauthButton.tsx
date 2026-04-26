import { useTranslation } from "react-i18next";

interface IOAuthButton {
  labelKey: string;
  icon: string;
  onClick: () => void;
  disabled?: boolean;
}

const OAuthButton = ({ labelKey, icon, onClick, disabled }: IOAuthButton) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:opacity-80 transition disabled:opacity-50"
    >
      <img src={icon} className="size-5" />
      {t(labelKey)}
    </button>
  );
};

export default OAuthButton;
