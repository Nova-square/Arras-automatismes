interface ResourcesNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ResourcesNavigation({ activeTab, onTabChange }: ResourcesNavigationProps) {
  const tabs = ['guides', 'tutoriels', 'documentation', 'faq', 'communauté'];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-3 rounded-full font-semibold transition-colors ${
            activeTab === tab
              ? 'bg-[#003366] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-[#ff6600] hover:text-white'
          } font-open-sans`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}