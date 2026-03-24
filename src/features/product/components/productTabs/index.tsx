import { useState, type ReactNode } from "react";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";

interface IProductTabs {
  children: {
    details: ReactNode;
    reviews: ReactNode;
    faqs: ReactNode;
  };
}

type TabKeys = keyof IProductTabs["children"];

const ProductTabs = ({ children }: IProductTabs) => {
  const [activeTab, setActiveTab] = useState<TabKeys>("details");

  const tabs = [
    { key: "details", label: "product.product_details" },
    { key: "reviews", label: "product.rating_reviews" },
    { key: "faqs", label: "product.faqs" },
  ];

  return (
    <div className="w.full">
      <TabHeader
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(key: string) => setActiveTab(key as TabKeys)}
      />
      <TabContent activeTab={activeTab} children={children} />
    </div>
  );
};

export default ProductTabs;
