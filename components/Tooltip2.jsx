import React from "react";
import clsx from "clsx";

export default function Tooltip({ content, children, placement = "bottom" }) {
  const getPositionClasses = (placement) => {
    switch (placement) {
      case "top":
        return {
          container: "bottom-full left-1/2 -translate-x-1/2 mb-2",
          arrow: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
        };
      case "right":
        return {
          container: "top-1/2 left-full -translate-y-1/2 ml-2",
          arrow: "top-1/2 left-0 -translate-y-1/2 -translate-x-1/2",
        };
      case "left":
        return {
          container: "top-1/2 right-full -translate-y-1/2 mr-2",
          arrow: "top-1/2 right-0 -translate-y-1/2 translate-x-1/2",
        };
      case "bottom":
      default:
        return {
          container: "top-full left-1/2 -translate-x-1/2 mt-2",
          arrow: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
        };
    }
  };

  const { container, arrow } = getPositionClasses(placement);

  return (
    <div className="relative group inline-block max-w-[200px] text-wrap">
      {children}
      <div
        className={clsx(
          "absolute opacity-0 group-hover:opacity-100 transition-opacity duration-150",
          "bg-gray-900 text-white text-xs rounded p-2 min-w-[110px] w-xs break-words z-10",
          "pointer-events-none group-hover:pointer-events-auto max-w-[200px] text-wrap",
          container
        )}
      >
        {content}
        <div
          className={clsx("absolute w-2 h-2 bg-black rotate-45 z-[-1]", arrow)}
        />
      </div>
    </div>
  );
}
