import { useState, useCallback } from "react";
import { uploadImage } from "@/features/shared/imageSelector/utils/uploadImage";
import { convertToWebP, toSelectedImage } from "../utils/imageSelector.utils";

export interface ISelectedImage {
  id: string;
  file: File;
  previewUrl: string;
  status: "idle" | "uploading" | "done" | "error";
  uploadedUrl?: string;
}

interface IUseImageSelectorOptions {
  bucket: string;
  maxImages?: number;
  onUploadsComplete?: (urls: string[]) => void;
  initialImages?: string[];
}

export const useImageSelector = ({
  bucket,
  maxImages = 3,
  onUploadsComplete,
  initialImages = [],
}: IUseImageSelectorOptions) => {
  const [images, setImages] = useState<ISelectedImage[]>(() =>
    initialImages.map(toSelectedImage),
  );

  const updateImageStatus = useCallback(
    (id: string, patch: Partial<ISelectedImage>) =>
      setImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, ...patch } : img)),
      ),
    [],
  );

  const addImages = useCallback(
    (files: FileList | File[]) => {
      const slots = maxImages - images.length;
      const newEntries = [...files]
        .filter((file) => file.type.startsWith("image/"))
        .slice(0, slots)
        .map(
          (file): ISelectedImage => ({
            id: `${Date.now()}-${Math.random()}`,
            file,
            previewUrl: URL.createObjectURL(file),
            status: "idle",
          }),
        );

      setImages((prev) => [...prev, ...newEntries]);
    },
    [images.length, maxImages],
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) URL.revokeObjectURL(imageToRemove.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const uploadAll = useCallback(async (): Promise<string[]> => {
    const pendingImages = images.filter((img) => img.status !== "done");
    const doneImages = images
      .filter((img) => img.status === "done" && img.uploadedUrl)
      .map((img) => img.uploadedUrl!);

    if (!pendingImages.length) return doneImages;

    const newImages: string[] = [];

    for (const entry of pendingImages) {
      updateImageStatus(entry.id, { status: "uploading" });
      try {
        const isSvg = entry.file.type === "image/svg+xml";
        const fileToUpload = isSvg
          ? entry.file
          : await convertToWebP(entry.file);
        const url = await uploadImage(fileToUpload, bucket);
        updateImageStatus(entry.id, { status: "done", uploadedUrl: url });
        newImages.push(url);
      } catch {
        updateImageStatus(entry.id, { status: "error" });
      }
    }

    const allUrls = [...doneImages, ...newImages];
    onUploadsComplete?.(allUrls);
    return allUrls;
  }, [images, bucket, onUploadsComplete, updateImageStatus]);

  const reset = useCallback(() => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
  }, [images]);

  return {
    images,
    canAddMore: images.length < maxImages,
    addImages,
    removeImage,
    uploadAll,
    reset,
  };
};
