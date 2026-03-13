interface ITabHeader {
  tabs: { key: string; label: string }[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

const TabHeader = ({ tabs, activeTab, onTabChange }: ITabHeader) => {
  return (
    <div className="grid grid-cols-3 border-b border-gray-300 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-2 sm:px-4 py-2 font-medium transition capitalize ${
            activeTab === tab.key
              ? "border-b-2 border-primary text-primary"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabHeader;
