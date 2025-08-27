"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ItemCard = ({ title, image, href, description, linkText }) => {
  return (
    <div className="p-4 flex flex-col flex-1 justify-center items-center gap-y-3 bg-white">
      <h2 className="font-semibold mb-2">{title}</h2>
      <Image
        src={image}
        alt={title}
        width={130}
        height={130}
        className="object-cover"
      />
      <p className="text-[12px] flex-1">{description}</p>

      <Link
        className="w-fit mt-4 px-3 py-1 bg-blue-400 text-white rounded-md  cursor-pointer"
        href={href}
      >
        {linkText}
      </Link>
    </div>
  );
};

export default ItemCard;
