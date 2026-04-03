import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface IErrorState {
  title: string;
  className?: string;
}

const ErrorState = ({ title, className }: IErrorState) => {
  const { t } = useTranslation();

  return (
    <div
      className={`w-[90%] flex flex-col items-center justify-center px-8 py-12 text-center mx-auto border rounded-2xl bg-red-50 ${className}`}
    >
      <AlertTriangle className="size-16 text-red-500 mb-6" />
      <h3 className="text-xl font-semibold mb-2 text-red-700">
        {t(`errors.${title}`)}
      </h3>
    </div>
  );
};

export default ErrorState;
