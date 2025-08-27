"use client";
import React from "react";
import ItemCard from "./ItemCard";

const ItemsCardContainer = ({ cards }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 p-5">
      {cards.map((card, index) => (
        <ItemCard
          key={index}
          title={card.title}
          href={card.href}
          image={card.image}
          description={card.description}
          linkText={card.linkText}
        />
      ))}
    </div>
  );
};

export default ItemsCardContainer;
