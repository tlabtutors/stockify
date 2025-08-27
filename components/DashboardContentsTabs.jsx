"use client";

import { useState, useEffect } from "react";
import { GettingStartedContents } from "./DsGettingStartedContents";
import { DashboardContents } from "./DsDashboardContents";
import { AnnouncementsContents } from "./DsAnnouncementsContents";
import { RecentUpdatesContents } from "./DsRecentUpdatesContents";
import FiveDotsLoader from "./FiveDotsLoader";

const tabs = [
  "Dashboard",
  "Getting Started",
  "Announcements",
  "Recent Updates",
];

export default function DashboardContentsTabs() {
  const [activeTab, setActiveTab] = useState("Getting Started");
  const [loading, setLoading] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardContents />;
      case "Announcements":
        return <AnnouncementsContents />;
      case "Recent Updates":
        return <RecentUpdatesContents />;
      default:
        return <GettingStartedContents />;
    }
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div
        className={`flex border-b border-gray-300 bg-white transition-shadow duration-300 px-2 ${
          isSticky ? "sticky top-[54px] z-40" : ""
        }`}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-3 font-medium transition-colors duration-200 ${
              activeTab === tab
                ? "border-b-4 border-blue-500 text-blue-600"
                : "text-gray-800 hover:text-blue-500"
            }`}
          >
            <span className="text-gray-800">{tab}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="text-sm min-h-[100px]">
        {loading ? (
          <div className="flex justify-center text-gray-900 animate-pulse p-4">
            <FiveDotsLoader />
          </div>
        ) : (
          renderTabContent()
        )}
      </div>
    </div>
  );
}
