import React from "react";
import Link from "next/link";

const DsFormHeader = ({ title, href, elem }) => {
  return (
    <div className="fixed w-[92%] flex justify-between font-normal shadow-sm bg-white p-2 px-16 top-12 mb-2">
      <h6 className="text-sm font-semibold">{title}</h6>
      <Link href={href}>{elem}</Link>
    </div>
  );
};

export default DsFormHeader;
