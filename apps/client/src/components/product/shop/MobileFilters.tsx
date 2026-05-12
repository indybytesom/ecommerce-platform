"use client";

import ProductFilters from "./ProductFilters";

type MobileFiltersProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileFilters({ isOpen, onClose }: MobileFiltersProps) {
  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto bg-white transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold">Filters</h2>

          <button onClick={onClose} className="text-2xl leading-none">
            ×
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <ProductFilters />
        </div>
      </div>
    </>
  );
}
