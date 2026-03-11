import { useState, type ReactNode } from "react";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";
import { useTranslation } from "react-i18next";

interface IProductTabs {
  children: {
    details: ReactNode;
    reviews: ReactNode;
    faqs: ReactNode;
  };
}

type TabKeys = keyof IProductTabs["children"];

const ProductTabs = ({ children }: IProductTabs) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKeys>("details");

  const tabs = [
    { key: "details", label: t("product-product details") },
    { key: "reviews", label: t("product-rating & reviews") },
    { key: "faqs", label: t("product-FAQs") },
  ];

  return (
    <div className="w-full">
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
