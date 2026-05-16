"use client";
import { useProductFilters } from "@/features/products/useProductFilters";

export default function SortDropdown() {
  const { updateFilter, searchParams } = useProductFilters();

  const handleSortChange = (value: string) => {
    updateFilter("sort", value === "default" ? "" : value);
  };

  return (
    <select
      value={searchParams.get("sort") || "default"}
      onChange={(e) => handleSortChange(e.target.value)}
      className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
    >
      <option value="default">Featured</option>
      <option value="latest">Latest</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
    </select>
  );
}
