"use client";
import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";
import SearchResults from "./SearchResults";
import { useSearch } from "../useSearch";

type SearchDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const { query, setQuery, results } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-full flex-col bg-white transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* HEADER */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border px-4">
              <Search size={20} className="text-gray-400" />

              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={inputRef}
                className="h-14 w-full outline-none"
              />
            </div>

            <button onClick={onClose}>
              <X size={26} />
            </button>
          </div>
        </div>

        {/* RESULTS */}
        <div className="flex-1 overflow-y-auto p-6">
          {query.trim() ? (
            <SearchResults products={results} onProductClick={onClose} />
          ) : (
            <div className="py-20 text-center text-gray-500">
              <div className="py-20 text-center">
                <h2 className="text-xl font-semibold">Search Products</h2>

                <p className="mt-2 text-sm text-gray-500">
                  Find products by name, category, or description.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
