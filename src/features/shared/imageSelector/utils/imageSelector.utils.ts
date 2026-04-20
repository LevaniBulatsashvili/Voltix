import imageCompression from "browser-image-compression";
import type { ISelectedImage } from "../hooks/useImageSelector";

export const toSelectedImage = (url: string): ISelectedImage => ({
  id: url,
  file: new File([], url),
  previewUrl: url,
  status: "done",
  uploadedUrl: url,
});

export const convertToWebP = async (file: File): Promise<File> => {
  return imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.82,
  });
};
