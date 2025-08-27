import React from "react";
import { PiClockClockwiseLight } from "react-icons/pi";
import SearchInput from "./SearchInput";
import { Bell, ChevronDown, Settings } from "lucide-react";
import { GoPlus } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { TbGridDots } from "react-icons/tb";
import Avatar from "./Avatar";
import Tooltip from "@/components/Tooltip";

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-[15%] w-[85%] z-50 flex justify-between py-2 px-3 bg-gray-50 border-b-gray-100">
      <div className="flex gap-x-2 items-center">
        <PiClockClockwiseLight size={20} />
        <SearchInput />
      </div>
      <div className="flex gap-x-7 items-center">
        <div className="flex gap-x-1 items-center pr-4 cursor-pointer">
          <span>Username</span> <ChevronDown className="text-black" />
        </div>
        <div className="flex gap-x-1 items-center bg-blue-500 rounded-sm p-1 text-3xl font-thin text-white cursor-pointer">
          <Tooltip content="Quick Create">
            <GoPlus className="cursor-pointer" />
          </Tooltip>
        </div>
        <Tooltip content="Refer and Earn">
          <FiUsers size={30} className="cursor-pointer" />
        </Tooltip>

        <Tooltip content="Notifications">
          <Bell className="cursor-pointer" />
        </Tooltip>
        <Tooltip content="Settings">
          <Settings className="cursor-pointer" />
        </Tooltip>
        <Avatar
          //src="https://example.com/avatar.jpg"
          name="Tech Pundit"
          size="w-5 h-5"
          rounded="rounded-full"
        />
        <TbGridDots size={25} className="cursor-pointer" />
      </div>
    </div>
  );
};
