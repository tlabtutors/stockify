"use client";
import React from "react";
import DsFormHeader from "@/components/Forms/DsFormHeader";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import Tooltip from "@/components/Tooltip";
import InventoryItemList from "@/components/Forms/InventoryItemList";

const Items = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center mt-auto">
      <DsFormHeader
        title="All Items"
        href={`/dashboard/inventory/items/new`}
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
      <InventoryItemList />
    </div>
  );
};

export default Items;
