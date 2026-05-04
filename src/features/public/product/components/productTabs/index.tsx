import { useCallback, useState, type ReactNode } from "react";
import ProductTabHeader from "./ProductTabHeader";
import ProductTabContent from "./ProductTabContent";

interface IProductTabs {
  children: {
    details: ReactNode;
    reviews: ReactNode;
    faqs: ReactNode;
  };
}

type TabKeys = keyof IProductTabs["children"];

const TABS = [
  { key: "details", label: "product.product_details" },
  { key: "reviews", label: "product.rating_reviews" },
  { key: "faqs", label: "product.faqs" },
];

const ProductTabs = ({ children }: IProductTabs) => {
  const [activeTab, setActiveTab] = useState<TabKeys>("details");

  const handleTabChange = useCallback(
    (key: string) => setActiveTab(key as TabKeys),
    [],
  );

  return (
    <div className="w-full">
      <ProductTabHeader
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <ProductTabContent activeTab={activeTab} children={children} />
    </div>
  );
};

export default ProductTabs;
