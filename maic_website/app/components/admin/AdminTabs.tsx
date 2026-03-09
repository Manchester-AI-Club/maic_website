import React from 'react';

interface AdminTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'members', label: 'Members' },
    { id: 'events', label: 'Events' },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <div className="flex space-x-4 mb-8 border-b border-gray-800 pb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            activeTab === tab.id
              ? 'bg-purple-600 text-white font-bold'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;
