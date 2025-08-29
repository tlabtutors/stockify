"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const pricingData = {
  Monthly: {
    Free: {
      price: "R0.00 Monthly",
      features: [
        "50 Orders/Month",
        "50 Invoices/Month",
        "20 Purchase Orders/Month",
        "20 Purchase Orders/Month",
        "1 Users",
        "2 Locations",
        "0 Bins/Location",
        "1000 API calls/day",
        {
          text: "Inventory",
          notes: [
            {
              text: "Inventory Module",
              className: "block mt-1 px-2 py-1 bg-emerald-600 rounded-sm ",
            },
          ],
        },
        "Item groups",
        "Composite Items",
        "Category",
        "Reorder Levels",
      ],
    },
    Standard: {
      price: "R259 Monthly",
      features: [
        "500 Orders/Month",
        "500 Invoices/Month",
        "500 Purchase Orders/Month",
        "300 Purchase Orders/Month",
        "1 Users",
        "2 Locations",
        "Bins/Location",
        "2500 API calls/day",
        {
          text: "Inventory",
          notes: [
            {
              text: "Inventory Module",
              className: "block mt-1 px-2 py-1 bg-emerald-600 rounded-sm ",
            },
          ],
        },
        "Item groups",
        "Composite Items",
        "Category",
        "Reorder Levels",
      ],
    },
    Pro: {
      price: "R479 Monthly",
      tag: "Best value",
      features: [
        "3,000 Orders/Month",
        "3,000 Invoices/Month",
        "1,500 Purchase Orders/Month",
        "1,500 Purchase Orders/Month",
        "2 Users",
        "4 Locations",
        "0 Bins/Location",
        "5,000 API calls/day",
        {
          text: "Inventory",
          notes: [
            {
              text: "Inventory Module",
              className: "block mt-1 px-2 py-1 bg-emerald-600 rounded-sm ",
            },
          ],
        },
        "Item groups",
        "Composite Items",
        "Category",
        "Reorder Levels",
      ],
    },
  },
  Annual: {
    Free: {
      price: "R0.00 Monthly",
      features: [
        "50 Orders/Month",
        "50 Invoices/Month",
        "20 Purchase Orders/Month",
        "20 Purchase Orders/Month",
        "1 Users",
        "2 Locations",
        "0 Bins/Location",
        "1000 API calls/day",
        {
          text: "Inventory",
          notes: [
            {
              text: "Inventory Module",
              className: "block mt-1 px-2 py-1 bg-emerald-600 rounded-sm ",
            },
          ],
        },
        "Item groups",
        "Composite Items",
        "Category",
        "Reorder Levels",
      ],
    },
    Standard: {
      price: "R215 Monthly",
      yearPrice: "R2,580 Yearly",
      oldPrice: "R259 Monthly",
      save: "Save R528 with annual payment",
      features: [
        "500 Orders/Month",
        "500 Invoices/Month",
        "500 Purchase Orders/Month",
        "300 Purchase Orders/Month",
        "1 Users",
        "2 Locations",
        "Bins/Location",
        "2500 API calls/day",
        {
          text: "Inventory",
          notes: [
            {
              text: "Inventory Module",
              className: "block mt-1 px-2 py-1 bg-emerald-600 rounded-sm ",
            },
          ],
        },
        "Item groups",
        "Composite Items",
        "Category",
        "Reorder Levels",
      ],
    },
    Pro: {
      price: "R429 Monthly",
      yearPrice: "R5,148 Yearly",
      oldPrice: "R479 Monthly",
      save: "Save R600 with annual payment",
      tag: "Best value",
      features: [
        "3,000 Orders/Month",
        "3,000 Invoices/Month",
        "1,500 Purchase Orders/Month",
        "1,500 Purchase Orders/Month",
        "2 Users",
        "4 Locations",
        "0 Bins/Location",
        "5,000 API calls/day",
        {
          text: "Inventory",
          notes: [
            {
              text: "Inventory Module",
              className: "block mt-1 px-2 py-1 bg-emerald-600 rounded-sm ",
            },
          ],
        },
        "Item groups",
        "Composite Items",
        "Category",
        "Reorder Levels",
      ],
    },
  },
};

export default function PricingPlans() {
  const [active, setActive] = useState("Monthly");
  const plans = pricingData[active];

  return (
    <div className="w-full md:w-[700px] m-auto mt-10 flex flex-col items-center py-4 text-[12px]">
      <h2 className="text-xl font-semibold mb-6">
        Start your 15 days free trial. Your Card won't be charged During this
        period
      </h2>

      {/* Navigation */}
      <div className="relative py-0.5 flex space-x-3 mb-8 bg-gray-100 rounded-sm shadow-inner">
        {["Monthly", "Annual"].map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`relative px-6 py-0.5 font-medium transition-colors rounded-sm z-10 ${
              active === item ? "text-black" : "text-gray-500"
            }`}
          >
            {item}
            <span className="text-emerald-700">
              {item === "Annual" ? " 10% | 17%" : ""}
            </span>
            {active === item && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white shadow-md rounded-sm -z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-7xl ">
        {Object.entries(plans).map(([plan, data]) => (
          <div
            key={plan}
            className={`relative p-4 rounded-xl shadow-lg border ${
              plan === "Standard" || plan === "Pro"
                ? "bg-gradient-to-tl from-emerald-600 via-emerald-700 to-emerald-900 text-white"
                : "bg-white"
            }`}
          >
            {data.tag && (
              <span className="absolute -top-3 right-4 bg-emerald-600 text-white px-3 py-1 text-xs rounded-full shadow-md">
                {data.tag}
              </span>
            )}

            <h6 className="text-[16px] font-normal mb-2">{plan}</h6>
            <p className="text-xl font-normal mb-2 flex items-center gap-2">
              <span className="text-[16px] font-semibold mx-0.5 ">
                {data.price}
              </span>
              {data.oldPrice && active === "Annual" && plan === "Standard" && (
                <span className="text-xs bg-emerald-100 text-emerald-700 p-0.5 rounded-sm">
                  -17%
                </span>
              )}
              {data.oldPrice && active === "Annual" && plan === "Pro" && (
                <span className="text-xs bg-emerald-100 text-emerald-700 p-0.5 rounded-sm">
                  -10%
                </span>
              )}
            </p>

            {data.oldPrice && (
              <p className="text-sm text-emerald-500 line-through">
                {data.oldPrice}
              </p>
            )}
            {data.yearPrice && (
              <p className="text-sm text-emerald-100 font-extrabold">
                {data.yearPrice}
              </p>
            )}
            {data.save && (
              <p className="text-[10px] font-normal">{data.save}</p>
            )}

            <button
              className={`w-full mt-4 py-2 rounded-sm font-semibold ${
                plan === "Standard" || plan === "Pro"
                  ? "bg-white text-emerald-600"
                  : "bg-emerald-600 text-white"
              }`}
            >
              Start free trial - R0 today
            </button>

            <ul className="mt-6 space-y-2 text-[10px]">
              {data.features.map((f, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      plan === "Standard" || plan === "Pro"
                        ? "text-emerald-300"
                        : "text-emerald-600"
                    }`}
                  />
                  {typeof f === "string" ? (
                    <span>{f}</span>
                  ) : (
                    <div>
                      {f.text}
                      {f.notes?.map((note, nIdx) => (
                        <span key={nIdx} className={`${note.className}`}>
                          {note.text}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
