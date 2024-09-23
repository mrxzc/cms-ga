import React from 'react'

export interface Tab {
  label: string
  value: string
}

interface TabNavigationProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tab: string) => void
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="inline-flex flex-row border rounded-lg overflow-hidden">
      {tabs.map(tab => (
        <button
          key={tab.value}
          className={`
            px-4 py-2 text-sm font-medium 
            ${activeTab === tab.value ? 'bg-[#235396] text-white' : 'text-gray-500 hover:bg-gray-100'}
          `}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default TabNavigation
