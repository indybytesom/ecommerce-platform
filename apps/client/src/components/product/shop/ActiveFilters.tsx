"use client";
import { X } from "lucide-react";
import { useProductFilters } from "@/features/products/useProductFilters";
import { useRouter } from "next/navigation";
import { PRODUCT_SORT_OPTIONS } from "@/constants/products";

export default function ActiveFilters() {
  const { searchParams, updateFilter } = useProductFilters();
  const router = useRouter();

  const selectedSort = searchParams.get("sort");

  const selectedSortLabel = PRODUCT_SORT_OPTIONS.find(
    (option) => option.value === selectedSort,
  )?.label;

  const filters = [
    {
      key: "category",
      label: searchParams.get("category"),
    },

    {
      key: "size",
      label: searchParams.get("size"),
    },

    {
      key: "availability",
      label: searchParams.get("availability"),
    },

    {
      key: "price",
      label: searchParams.get("price")
        ? `Under $${searchParams.get("price")}`
        : null,
    },

    {
      key: "sort",
      label: selectedSortLabel,
    },
  ].filter((filter) => filter.label);

  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => updateFilter(filter.key, "")}
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium transition hover:border-black"
        >
          <span>{filter.label}</span>

          <X size={14} />
        </button>
      ))}

      <button
        onClick={() => router.push("/shop")}
        className="text-sm font-semibold text-black underline underline-offset-4 transition hover:opacity-70"
      >
        Clear All
      </button>
    </div>
  );
}
