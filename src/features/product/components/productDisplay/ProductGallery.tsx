import { useState } from "react";
import electronicsImg from "../../../../assets/images/Electronics.png";
import cameraImg from "../../../../assets/images/Cameras.png";
import tabletImg from "../../../../assets/images/Tablet.png";

interface ProductGalleryProps {
  images?: string[];
  name: string;
}

const ProductGallery = ({ images = [], name }: ProductGalleryProps) => {
  const galleryImages = images.length
    ? images
    : [tabletImg, cameraImg, electronicsImg];

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 w-full">
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-1 sm:grid-rows-3 gap-1 sm:gap-2">
          {galleryImages.slice(0, 3).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${name}-${idx}`}
              onClick={() => setSelectedImage(img)}
              className={`sm:size-32 object-cover rounded cursor-pointer transition
              ${
                selectedImage === img
                  ? "ring-2 ring-gray-600"
                  : "hover:ring-2 hover:ring-gray-800"
              }`}
            />
          ))}
        </div>
      )}

      <div className="flex-1">
        <img
          src={selectedImage}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
