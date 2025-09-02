"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiFileText,
  FiBookOpen,
  FiChevronDown,
  FiTrendingUp,
} from "react-icons/fi";
import { TfiPlug } from "react-icons/tfi";
import { MdChevronLeft, MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const pathname = usePathname();
  const router = useRouter();
  const basePath = "/dashboard";
  const navItems = [
    {
      label: "Home",
      href: "/home",
      icon: <FiHome className="w-5 h-5" />,
    },
    {
      label: "Inventory",
      icon: <FiBox className="w-5 h-5" />,
      children: [
        { label: "Items", href: "/inventory/items" },
        { label: "Composite Items", href: "/inventory/compositeitems" },
        { label: "Item Groups", href: "/inventory/itemgroups" },
        { label: "Inventory  Adjustments", href: "/inventory/adjustment" },
      ],
    },
    {
      label: "Sales",
      icon: <FiTrendingUp className="w-5 h-5" />,
      children: [
        { label: "Customers", href: "/customers" },
        { label: "Sales Orders", href: "/sales/orders" },
        { label: "Packages", href: "/sales/orders" },
        { label: "Invoices", href: "/invoices" },
        { label: "Sales Receipts", href: "/salesreceipts" },
        { label: "Payments Received", href: "/salesreceived" },
        { label: "Sales Returns", href: "/salesreturns" },
      ],
    },
    {
      label: "Purchases",
      icon: <FiShoppingCart className="w-5 h-5" />,
      children: [
        { label: "Vendors", href: "/vendors" },
        { label: "Expenses", href: "/expenses" },
        { label: "Purchase Orders", href: "/purchaseorders" },
        { label: "Purchase Receives", href: "/purchasereceives" },
        { label: "Bills", href: "/bills" },
        { label: "Payment Made", href: "/paymentmade" },
        { label: "Vendor Credits", href: "/credits" },
      ],
    },
    {
      label: "Integration",
      href: "/integration",
      icon: <TfiPlug className="w-5 h-5" />,
    },
    {
      label: "Reports",
      href: "/reports",
      icon: <FiFileText className="w-5 h-5" />,
    },
    {
      label: "Documents",
      href: "/docs",
      icon: <FiBookOpen className="w-5 h-5" />,
    },
  ];

  const prependBasePath = (href) => `${basePath}${href}`;

  const handleNav = (href) => {
    router.push(prependBasePath(href));
  };

  const isActive = (href) => pathname === prependBasePath(href);

  return (
    <aside className="TW-Sidebar">
      <div>
        <div className="flex px-3 py-2 bg-slate-900 text-2xl">
          <Link
            href={prependBasePath("/home")}
            className="flex gap-2 text-gray-300 items-center"
          >
            <MdOutlineShoppingCartCheckout size={20} />
            Inventory
          </Link>
        </div>

        <nav className="flex flex-col py-2 gap-y-6 px-3">
          {navItems.map((item) => {
            const hasChildren = item.children?.length > 0;
            const isOpen = openMenus[item.label];
            const parentIsActive =
              (!hasChildren && isActive(item.href)) ||
              (hasChildren &&
                item.children.some((child) => isActive(child.href)));

            return (
              <div key={item.label} className="space-y-1">
                <button
                  className={`flex w-full items-center justify-between px-3 py-2 text-left rounded-md transition-colors duration-200 ${
                    parentIsActive ? "bg-blue-600" : "hover:bg-gray-800"
                  }`}
                  onClick={() =>
                    hasChildren
                      ? setOpenMenus((prev) => ({
                          ...prev,
                          [item.label]: !prev[item.label],
                        }))
                      : handleNav(item.href)
                  }
                >
                  <div className="flex w-full justify-start items-center space-x-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  {hasChildren && (
                    <FiChevronDown
                      className={`w-4 h-4 transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {hasChildren && isOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-2 text-sm"
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <button
                            onClick={() => handleNav(child.href)}
                            className={`block w-full text-left text-wrap px-3 py-1.5 rounded hover:bg-gray-800 ${
                              isActive(child.href) ? "bg-blue-600" : ""
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              {child.label}
                              <FaPlus
                                size={15}
                                className="bg-white rounded-full flex justify-center items-center text-blue-500 text-[10px] w-4 h-4 p-1"
                              />
                            </div>
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>
      <div className="flex justify-center py-1.5">
        <MdChevronLeft />
      </div>
    </aside>
  );
};

export default Sidebar;
