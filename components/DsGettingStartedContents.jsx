"use client";
import { useState } from "react";
import { Tab1 } from "./Tab1";
import { Tab2 } from "./Tab2";
import { Tab3 } from "./Tab3";
import { Tab4 } from "./Tab4";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
const tabs = [
  { id: "Tab1", label: "Configure your Inventory", content: <Tab1 /> },
  {
    id: "Tab2",
    label: "Configure the Purchase module",
    content: <Tab2 />,
  },
  {
    id: "Tab3",
    label: "Configure the sales module",
    content: <Tab3 />,
  },
  {
    id: "Tab4",
    label: "Dispatch your order",
    content: <Tab4 />,
  },
];

export const GettingStartedContents = () => {
  const [activeTab, setActiveTab] = useState("Tab1");

  return (
    <div className="w-full bg-yellow-50 p-20 flex flex-col justify-center gap-y-5 items-center">
      <div className="w-full max-w-3xl items-center pb-2">
        <h1 className="font-bold text-xl">Welcome to Stockiffy Inventory</h1>
        <div className="flex justify-between mt-2">
          <span className="text-sm font-normal text-gray-600">
            The easy-to-use inventory system that you can set up in no time!
          </span>
          <button className="flex justify-between items-center px-2 gap-x-2 border-1 border-blue-300 p-1 rounded-sm text-blue-400 text-[12px] cursor-pointer">
            <FaPlus className="font-thin" />
            Quick Create
          </button>
        </div>
      </div>
      <div className="bg-white border border-gray-300 overflow-hidden w-full max-w-3xl mx-auto">
        {/* Header bar */}
        <div className="flex p-3 justify-between">
          <div className="flex items-center justify-between gap-x-3">
            Let's get you up and running{" "}
            <button className="border-1 border-blue-300 px-2 py-1 rounded-sm text-blue-400 text-[12px] cursor-pointer transition-all hover:bg-blue-400 hover:text-white">
              Mark as Completed
            </button>
          </div>
          <div className="text-green-600 flex items-center justify-between gap-x-3">
            <div className="w-12 h-1 bg-gray-200"></div> 0% Completed
          </div>
        </div>
        <div className="h-[1px] border-b border-gray-200 bg-gray-100" />
        {/* Main content */}
        <div className="flex min-h-[220px] max-h-[270px]">
          {/* Tabs */}
          <div className="w-50 flex flex-col">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center text-[12px] gap-x-2 text-blue-500 px-2 
                ${
                  activeTab === tab.id
                    ? "border-l-2 border-blue-500"
                    : "border-t-1 border-b-1 border-r border-gray-200"
                }
                `}
              >
                <FaCheckCircle className="text-blue-200" size={15} />{" "}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4 text-gray-800 text-base">
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};
