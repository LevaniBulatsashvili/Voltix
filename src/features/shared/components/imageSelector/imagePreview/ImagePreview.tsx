import type { ISelectedImage } from "../../../hooks/useImageSelector";
import ImageStatusOverlay from "./ImageStatusOverlay";

interface IImagePreview {
  img: ISelectedImage;
  onRemove: (id: string) => void;
}

export const ImagePreview = ({ img, onRemove }: IImagePreview) => (
  <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-gray-200 shrink-0">
    <img
      src={img.previewUrl}
      alt={
        img.file.name || img.uploadedUrl?.split("/").pop() || "product image"
      }
      className="w-full h-full object-cover"
    />
    <ImageStatusOverlay status={img.status} />
    {img.status !== "uploading" && (
      <button
        type="button"
        onClick={() => onRemove(img.id)}
        className="absolute top-1 left-1 w-5 h-5 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
      >
        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 2l8 8M10 2l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    )}
  </div>
);
