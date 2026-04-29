import { useTranslation } from "react-i18next";

interface IErrorMessage {
  message: string;
}

const ErrorMessage = ({ message }: IErrorMessage) => {
  const { t, i18n } = useTranslation();

  const fallbackMessages: Record<string, string> = {
    ka: "დაფიქსირდა შეცდომა",
    en: "Something went wrong",
  };

  return (
    <p className="mt-2 text-center text-red-500">
      {t(`errors.${message}`, {
        defaultValue: fallbackMessages[i18n.language] || "Something went wrong",
      })}
    </p>
  );
};

export default ErrorMessage;
