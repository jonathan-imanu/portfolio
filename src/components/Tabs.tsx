import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface TabsProps {
  tabs: Array<{ id: string; label: string; content: ReactNode }>;
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const prevDefaultTabRef = useRef(defaultTab);
  const userHasClickedRef = useRef(false);

  // Update active tab if defaultTab changes from external source (e.g., URL params)
  // But only if user hasn't manually clicked a tab
  useEffect(() => {
    if (
      defaultTab &&
      defaultTab !== prevDefaultTabRef.current &&
      !userHasClickedRef.current
    ) {
      setActiveTab(defaultTab);
    }
    prevDefaultTabRef.current = defaultTab;
  }, [defaultTab]);

  const handleTabClick = (tabId: string) => {
    userHasClickedRef.current = true;
    setActiveTab(tabId);
  };

  return (
    <div className="mt-6">
      {/* Tab buttons */}
      <div className="flex border-b border-gray-200 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
