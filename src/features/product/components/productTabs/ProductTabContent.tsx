import { type ReactNode } from "react";

interface IProductTabContent {
  activeTab: string;
  children: { [key: string]: ReactNode };
}

const ProductTabContent = ({ activeTab, children }: IProductTabContent) => {
  return <div className="mt-8">{children[activeTab]}</div>;
};

export default ProductTabContent;
