import { useEffect, useRef, useState, type RefObject } from "react";
import { useImageSelector } from "../hooks/useImageSelector";
import { ImagePreview } from "./ImagePreview";
import { ImageAddSlot } from "./ImageAddSlot";

interface IImageSelector {
  bucket: string;
  maxImages?: number;
  onUploadsComplete?: (urls: string[]) => void;
  uploadRef?: RefObject<(() => Promise<string[]>) | null>;
  initialImages?: string[];
}

export const ImageSelector = ({
  bucket,
  maxImages = 3,
  onUploadsComplete,
  uploadRef,
  initialImages = [],
}: IImageSelector) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { images, canAddMore, addImages, removeImage, uploadAll } =
    useImageSelector({ bucket, maxImages, onUploadsComplete, initialImages });

  useEffect(() => {
    if (uploadRef) uploadRef.current = uploadAll;
  }, [uploadAll, uploadRef]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (canAddMore) addImages(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 flex-wrap">
        {images.map((img) => (
          <ImagePreview key={img.id} img={img} onRemove={removeImage} />
        ))}
        {canAddMore && (
          <ImageAddSlot
            current={images.length}
            max={maxImages}
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            isDragging={isDragging}
          />
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addImages(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
};
