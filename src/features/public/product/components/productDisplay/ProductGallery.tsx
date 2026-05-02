import { useState } from "react";
import type { IProductImage } from "@/types/public/product";

interface ProductGalleryProps {
  galleryImages?: Omit<IProductImage, "product_id">[];
  name: string;
}

const ProductGallery = ({ galleryImages = [], name }: ProductGalleryProps) => {
  if (galleryImages.length === 0)
    galleryImages = [
      { id: "1", image_url: "/images/placeholders/product.webp" },
    ];

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const [fade, setFade] = useState(true);

  const handleSelect = (image: (typeof galleryImages)[0]) => {
    if (image.id === selectedImage.id) return;
    setFade(false);
    setTimeout(() => {
      setSelectedImage(image);
      setFade(true);
    }, 150);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-3 w-full items-stretch">
      {galleryImages.length > 1 && (
        <div className="flex flex-row sm:flex-col gap-4 order-2 sm:order-1">
          {galleryImages.slice(0, 4).map((image, idx) => (
            <button
              key={image.id}
              onClick={() => handleSelect(image)}
              className={`
                  relative flex-1 sm:flex-none aspect-square sm:size-32 shrink-0 rounded-lg overflow-hidden
                  ring-offset-1 transition-all duration-200
                  ${
                    selectedImage.id === image.id
                      ? "ring-2 ring-gray-800 opacity-100"
                      : "ring-1 ring-gray-200 opacity-60 hover:opacity-100 hover:ring-gray-400"
                  }
              `}
            >
              <img
                src={image.image_url}
                alt={`${name} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="order-1 sm:order-2 min-w-0 rounded-xl overflow-hidden bg-gray-50 max-h-125">
        <img
          src={selectedImage.image_url}
          alt={name}
          className={`w-full h-full object-cover transition-opacity duration-150 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
