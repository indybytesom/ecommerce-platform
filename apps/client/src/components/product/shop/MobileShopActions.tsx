"use client";
import { useState } from "react";
import MobileFilters from "./MobileFilters";
import { useProductFilters } from "@/features/products/useProductFilters";

export default function MobileShopActions() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { searchParams, updateFilter } = useProductFilters();

  const handleSortChange = (value: string) => {
    updateFilter("sort", value === "default" ? "" : value);
  };

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

        <select
          value={searchParams.get("sort") || "default"}
          onChange={(e) => handleSortChange(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 text-sm"
        >
          <option value="default">Featured</option>
          <option value="latest">Latest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </>
  );
}
