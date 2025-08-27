"use client";

import { useState } from "react";

const tabs = [
  { id: "tab1", label: "Dashboard", content: "Welcome to the Dashboard." },
  { id: "tab2", label: "Reports", content: "Here are your Reports." },
  { id: "tab3", label: "Settings", content: "Adjust your Settings here." },
  { id: "tab4", label: "Help", content: "Need Help? Start here." },
];

export const VerticalTabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="bg-white border border-gray-300 rounded-md overflow-hidden w-full max-w-4xl mx-auto">
      {/* Header bar */}
      <div className="h-[15px] border-b border-gray-200 bg-gray-100"></div>

      {/* Main content */}
      <div className="flex h-[300px]">
        {/* Tabs */}
        <div className="w-40 border-r border-gray-200 flex flex-col">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center text-sm text-gray-700 py-4 relative
                ${
                  activeTab === tab.id
                    ? "border-l-2 border-blue-500 bg-blue-50"
                    : "border-l-2 border-transparent"
                }
                ${idx !== tabs.length - 1 ? "border-b border-gray-200" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 text-gray-800 text-base">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>
    </div>
  );
};
