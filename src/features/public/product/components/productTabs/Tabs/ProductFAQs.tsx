import { useState } from "react";

interface IFaq {
  question: string;
  answer: string;
}

interface IProductFAQs {
  faqs: IFaq[];
}

const ProductFAQs = ({ faqs }: IProductFAQs) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-400 rounded-lg overflow-hidden text-black"
        >
          <button
            className="w-full text-left px-4 py-3 bg-gray-50 flex justify-between items-center font-medium hover:bg-gray-100 transition"
            onClick={() => toggleFaq(index)}
          >
            {faq.question}
            <span
              className={`transform transition-transform ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>
          {openIndex === index && (
            <div className="px-4 py-3 text-gray-700 bg-white">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductFAQs;
