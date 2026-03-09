import { useState } from "react";
import type { IProduct } from "../../../../types/Product";
import ProductGallery from "./ProductGallery";

import ProductInfo from "./ProductInfo";
import ProductTabs from "../productTabs";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import { dummyCustomers } from "../../../../utils/dummyCustomers";
import ProductFAQs from "./ProductFAQs";

interface IProductDisplay {
  product: IProduct;
}

const ProductDisplay = ({ product }: IProductDisplay) => {
  const {
    name,
    price,
    currency,
    discountPercentage,
    rating,
    stock,
    description,
  } = product;

  const laptopFaqs = [
    {
      question: "Is this laptop suitable for professional workloads?",
      answer:
        "Yes, the MacBook Pro 14 with Apple M3 chip is designed for demanding professional applications including video editing, 3D rendering, and software development.",
    },
    {
      question: "What warranty does it come with?",
      answer:
        "It comes with a 1-year manufacturer warranty covering hardware defects.",
    },
    {
      question: "Does it support external monitors?",
      answer:
        "Yes, it supports multiple external monitors with high-resolution outputs via Thunderbolt 4 ports.",
    },
    {
      question: "Can I upgrade the RAM or storage later?",
      answer:
        "No, the RAM and storage are soldered onto the motherboard. Choose the configuration carefully when purchasing.",
    },
    {
      question: "What is the battery life like?",
      answer:
        "Up to 18 hours of web browsing or video playback, depending on usage and settings.",
    },
  ];

  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const increase = () => {
    if (quantity < stock) setQuantity((q) => q + 1);
  };

  return (
    <div>
      <div className="grid grid-cols-[4fr_2fr] mb-20">
        <ProductGallery name={name} />

        <ProductInfo
          name={name}
          rating={rating}
          price={price}
          discount={discountPercentage}
          currency={currency}
          description={description}
          stock={stock}
          quantity={quantity}
          increase={increase}
          decrease={decrease}
        />
      </div>

      <ProductTabs
        children={{
          details: <ProductDetails product={product} />,
          reviews: <ProductReviews reviews={dummyCustomers} />,
          faqs: <ProductFAQs faqs={laptopFaqs} />,
        }}
      />
    </div>
  );
};

export default ProductDisplay;
