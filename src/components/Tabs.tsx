import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface TabsProps {
  tabs: Array<{ id: string; label: string; content: ReactNode }>;
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const userInteractedRef = useRef(false);

  // Update active tab if defaultTab changes externally, but only if user hasn't interacted
  useEffect(() => {
    if (defaultTab && defaultTab !== activeTab && !userInteractedRef.current) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, activeTab]);

  const handleTabClick = (tabId: string) => {
    userInteractedRef.current = true;
    setActiveTab(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="mt-6">
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
      <div className="mt-4">{activeTabContent}</div>
    </div>
  );
}
