"use client";
import { Check } from "lucide-react";
import { getProducts } from "@/features/products/productQueries";
import { useProductFilters } from "@/features/products/useProductFilters";

export default function ProductFilters() {
  const { searchParams, updateFilter } = useProductFilters();
  const products = getProducts();
  // const categories = ["Hoodies", "T-Shirts", "Denim", "Outerwear"];
  const categories = ["Fashion", "Electronics", "Beauty", "Lifestyle"];
  const sizes = ["S", "M", "L", "XL"];
  const selectedCategory = searchParams.get("category");
  const selectedSize = searchParams.get("size");
  const selectedAvailability = searchParams.get("availability");
  const selectedPrice = Number(searchParams.get("price") || 500);

  const toggleCategory = (category: string) => {
    updateFilter("category", selectedCategory === category ? "" : category);
  };

  const toggleAvailability = (item: string) => {
    updateFilter("availability", selectedAvailability === item ? "" : item);
  };

  return (
    <div className="sticky top-28 space-y-10">
      {/* CATEGORY */}
      <div className="border-b border-gray-200 pb-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
          Categories
        </h3>

        <div className="mt-6 space-y-4">
          {categories.map((item, index) => {
            const checked = selectedCategory === item;

            return (
              <button
                key={index}
                onClick={() => toggleCategory(item)}
                className="flex w-full items-center justify-between text-sm text-gray-700 transition hover:text-black"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                      checked
                        ? "border-black bg-black text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {checked && <Check size={12} strokeWidth={3} />}
                  </div>

                  <span>{item}</span>
                </div>

                <span className="text-gray-400">
                  {
                    products.filter((product) => product.category === item)
                      .length
                  }
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SIZE */}
      <div className="border-b border-gray-200 pb-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
          Sizes
        </h3>

        <div className="mt-6 flex flex-wrap gap-3">
          {sizes.map((size, i) => {
            const active = selectedSize === size;

            return (
              <button
                key={i}
                onClick={() =>
                  updateFilter("size", selectedSize === size ? "" : size)
                }
                className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-medium transition ${
                  active
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* PRICE */}
      <div className="border-b border-gray-200 pb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
            Price
          </h3>

          <span className="text-sm text-gray-500">$0 - ${selectedPrice}</span>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="h-1 rounded-full bg-gray-200" />

            <div
              className="absolute left-0 top-0 h-1 rounded-full bg-black"
              style={{
                width: `${(selectedPrice / 500) * 100}%`,
              }}
            />

            <input
              type="range"
              min="0"
              max="500"
              value={selectedPrice}
              onChange={(e) => updateFilter("price", e.target.value)}
              className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
            />
          </div>
        </div>
      </div>

      {/* AVAILABILITY */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
          Availability
        </h3>

        <div className="mt-6 space-y-4">
          {["In Stock", "Out of Stock"].map((item, index) => {
            const checked = selectedAvailability === item;

            return (
              <button
                key={index}
                onClick={() => toggleAvailability(item)}
                className="flex w-full items-center justify-between text-sm text-gray-700 transition hover:text-black"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                      checked
                        ? "border-black bg-black text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {checked && <Check size={12} strokeWidth={3} />}
                  </div>

                  <span>{item}</span>
                </div>

                <span className="text-gray-400">
                  {
                    products.filter((product) =>
                      item === "In Stock" ? product.inStock : !product.inStock,
                    ).length
                  }
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
