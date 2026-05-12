"use client";

import { useState } from "react";

const accordionItems = [
  {
    title: "Description",
    content:
      "Premium modern fashion piece designed with high-quality materials and timeless aesthetics.",
  },
  {
    title: "Shipping",
    content:
      "Free worldwide shipping on all orders over $100. Delivery typically takes 3-7 business days.",
  },
  {
    title: "Returns",
    content:
      "Easy 14-day returns and exchanges on all unworn items with original packaging.",
  },
];

export default function ProductAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-14 divide-y divide-gray-200 border-y border-gray-200">
      {accordionItems.map((item, index) => (
        <div key={item.title}>
          <button
            onClick={() => toggleAccordion(index)}
            className="flex w-full items-center justify-between py-5 text-left"
          >
            <span className="text-base font-medium">{item.title}</span>

            <span className="text-xl">{activeIndex === index ? "−" : "+"}</span>
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              activeIndex === index
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="pb-5 pr-8 text-sm leading-7 text-gray-600">
                {item.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
