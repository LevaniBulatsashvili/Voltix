import Spinner from "@/components/feedback/Spinner";
import type { ISelectedImage } from "@/features/shared/hooks/useImageSelector";
import { useTranslation } from "react-i18next";

interface IImageStatusOverlay {
  status: ISelectedImage["status"];
}

const ImageStatusOverlay = ({ status }: IImageStatusOverlay) => {
  const { t } = useTranslation();

  if (status === "uploading")
    return (
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <Spinner spinnerclass="size-8! border-6!" />
      </div>
    );

  if (status === "done")
    return (
      <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6l3 3 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );

  if (status === "error")
    return (
      <div className="absolute inset-0 bg-red-500/70 flex items-center justify-center">
        <span className="text-white text-xs font-medium">
          {t("errors.upload_failed")}
        </span>
      </div>
    );

  return null;
};

export default ImageStatusOverlay;
