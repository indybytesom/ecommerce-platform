"use client";

import { useState } from "react";

import MobileFilters from "./MobileFilters";

export default function MobileShopActions() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <>
      <MobileFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
      />

      <div className="mb-6 flex items-center justify-between lg:hidden">
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium"
        >
          Filters
        </button>

        <select className="rounded-xl border border-gray-300 px-4 py-3 text-sm">
          <option>Latest</option>

          <option>Price: Low to High</option>

          <option>Price: High to Low</option>
        </select>
      </div>
    </>
  );
}
