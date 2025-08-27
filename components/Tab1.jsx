import React from "react";
import Link from "next/link";

export const Tab1 = () => {
  return (
    <div className="px-5">
      <h3 className="text-black font-bold">Configure your Inventory</h3>
      <p className="my-3 text-gray-600 text-sm">
        Add the goods or services that your business deals with in Zoho
        Inventory. You can also add multiple variations of the same item as an
        item group or combine multiple items into one by creating a composite
        item.
      </p>

      <button className="bg-blue-400 py-1 px-2 rounded-sm text-white text-[12px] cursor-pointer">
        Create an Item
      </button>

      <div className="relative w-full flex justify-start border-t-1 border-gray-200 gap-x-4 py-4 h-[30px] mt-4 text-sm">
        <span className="text-blue-500 border-r-1 border-gray-300 pr-4 h-5">
          Item group Create
        </span>
        <Link href={`/dashboard/home`} className="text-blue-500">
          Create a composite Item
        </Link>
      </div>
    </div>
  );
};
