"use client";
import React from "react";
import DsFormHeader from "@/components/Forms/DsFormHeader";
import ItemsCardContainer from "@/components/ItemsCardContainer";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import Tooltip from "@/components/Tooltip";

const cardData = [
  {
    title: "Item Groups",
    image: "/images/item1.png",
    description: "Create multiple variants of the same item using Item Groups",
    linkText: "New Item Group",
    href: "/dashboard/inventory/itemgroups/new",
  },
  {
    title: "Items",
    image: "/images/item2.png",
    description: "Create standalone items and services that you buy and sell",
    linkText: "New Item",
    href: "/dashboard/inventory/items/new",
  },
  {
    title: "Composite Items",
    image: "/images/item3.png",
    description:
      "Group different items together and sell them as a single item",
    linkText: "New Composite Item",
    href: "/dashboard/inventory/compositeitems/new",
  },
  {
    title: "Price Lists",
    image: "/images/item4.png",
    description: "Tweak your item prices for specific contacts or transactions",
    linkText: "Enable Now",
    href: "/dashboard/inventory/pricelist/new",
  },
  // Add more cards as needed
];

const Items = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center  mt-auto">
      <DsFormHeader
        title="All Composite Items"
        href={`/dashboard/dashboard/inventory/compositeitems/new`}
        elem={
          <div className="flex justify-between items-center gap-x-1">
            <Tooltip content="Create New Item">
              <span className="flex justify-center items-center p-2 bg-blue-500 text-white rounded-md font-normal text-[12px]">
                <FaPlus size={12} />
                New
              </span>
            </Tooltip>

            <Tooltip content="More Actions">
              <span className="flex justify-center items-center py-2 px-3 gap-x-1 bg-gray-100 border-1 border-gray-300 rounded-md font-normal text-[12px]">
                <BsThreeDots size={15} />
              </span>
            </Tooltip>
          </div>
        }
      />
      <ItemsCardContainer cards={cardData} />
    </div>
  );
};

export default Items;
