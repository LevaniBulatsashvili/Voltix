import { AlertTriangle, RefreshCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

interface IErrorState {
  title: string;
  className?: string;
  isRetrying?: boolean;
  onRetry?: () => void;
}

const ErrorState = ({ title, className, isRetrying, onRetry }: IErrorState) => {
  const { t } = useTranslation();

  return (
    <div
      className={`w-full relative px-8 py-12 text-center border rounded-2xl bg-red-50 mx-auto flex flex-col items-center justify-center ${className}`}
    >
      <AlertTriangle className="size-16 text-red-500 mb-6" />
      <h3 className="text-xl font-semibold mb-2 text-red-700">
        {t(`errors.${title}`)}
      </h3>

      {onRetry && (
        <button
          onClick={onRetry}
          className="absolute text-red-950 hover:opacity-80 top-3 right-3 disabled:opacity-55"
          disabled={isRetrying}
        >
          <RefreshCcw
            size={30}
            strokeWidth={2.8}
            className={`transition-transform ${
              isRetrying ? "animate-spin-reverse" : ""
            }`}
          />
        </button>
      )}
    </div>
  );
};

export default ErrorState;
