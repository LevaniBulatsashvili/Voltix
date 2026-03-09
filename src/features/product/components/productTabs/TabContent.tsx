import { type ReactNode } from "react";

interface ITabContent {
  activeTab: string;
  children: { [key: string]: ReactNode };
}

const TabContent = ({ activeTab, children }: ITabContent) => {
  return <div className="mt-8">{children[activeTab]}</div>;
};

export default TabContent;
