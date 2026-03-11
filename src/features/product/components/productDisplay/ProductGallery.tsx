import { useState } from "react";
import electronicsImg from "../../../../assets/images/Electronics.png";
import cameraImg from "../../../../assets/images/Cameras.png";
import headphonesImg from "../../../../assets/images/Headphones.png";

interface ProductGalleryProps {
  images?: string[];
  name: string;
}

const ProductGallery = ({ images = [], name }: ProductGalleryProps) => {
  const galleryImages = images.length
    ? images
    : [cameraImg, electronicsImg, headphonesImg];

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  return (
    <div className="flex gap-4 w-full">
      {galleryImages.length > 1 && (
        <div className="flex flex-col gap-2">
          {galleryImages.slice(0, 3).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${name}-${idx}`}
              onClick={() => setSelectedImage(img)}
              className={`size-20 object-cover rounded cursor-pointer transition
              ${
                selectedImage === img
                  ? "ring-2 ring-blue-500"
                  : "hover:ring-2 hover:ring-blue-500"
              }`}
            />
          ))}
        </div>
      )}

      <div className="flex-1">
        <img
          src={selectedImage}
          alt={name}
          className="w-full h-100 object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
