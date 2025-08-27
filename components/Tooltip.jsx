import React from "react";

export default function Tooltip({ content, children }) {
  return (
    <div className="relative group inline-block">
      {children}

      <div
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                      opacity-0 group-hover:opacity-100 transition-opacity duration-150
                      bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap
                      z-10 pointer-events-none group-hover:pointer-events-auto"
      >
        {content}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        w-2 h-2 bg-black rotate-45 z-[-1]"
        />
      </div>
    </div>
  );
}
