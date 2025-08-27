import React from "react";
import { MdOutlineFolderCopy } from "react-icons/md";
const name = "Tech Pundit";
const username = "Tech";
const hotline = "Zoho Intentory Hotline";
const daytime = "Mon - Fri | 8:00 AM - 5:00 PM";
const Welcome = () => {
  return (
    <div className="flex justify-between pt-16 bg-white">
      <div className="flex p-2 items-center gap-x-3 mt-5">
        <div className="flex p-3.5 justify-center items-center border border-gray-300 text-gray-400 rounded-sm">
          <MdOutlineFolderCopy size={20} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-2xl">Hello, {name}</span>
          <span>{username}</span>
        </div>
      </div>
      <div className="flex flex-col p-2 items-center mt-5 font-normal text-sm ">
        <span className="flex w-auto justify-end">{hotline}</span>
        <span className="flex w-auto justify-end">{daytime}</span>
      </div>
    </div>
  );
};

export default Welcome;
