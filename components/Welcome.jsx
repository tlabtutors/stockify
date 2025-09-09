"use client";
import React from "react";
import { MdOutlineFolderCopy } from "react-icons/md";
import { useSession } from "@/context/SessionProvider";
const name = "Tech Pundit";
const username = "Tech";
const hotline = "Stockiffy Intentory Hotline: +27 00 000 0000";
const daytime = "Work Days/Time: Mon - Fri | 8:00 AM - 5:00 PM";
const Welcome = () => {
  const session = useSession();
  return (
    <div className="flex justify-between pt-20">
      <div className="flex px-2 items-center gap-x-3 mt-5">
        <div className="flex p-2.5 justify-center items-center border border-gray-300 text-gray-400 rounded-sm">
          <MdOutlineFolderCopy size={16} />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Hello, {session?.user?.name}</span>
          <span>{username}</span>
        </div>
      </div>
      <div className="flex flex-col p-2 items-center mt-5 font-normal text-[12px]">
        <span className="flex w-auto justify-end">{hotline}</span>
        <span className="flex w-auto justify-end">{daytime}</span>
      </div>
    </div>
  );
};

export default Welcome;
