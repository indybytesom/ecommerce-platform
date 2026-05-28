"use client";

import { useState } from "react";

import CartDrawer from "@/features/cart/components/CartDrawer";
import SearchDrawer from "@/features/products/components/SearchDrawer";
import { SearchContext } from "@/hooks/searchContext";

export default function GlobalUI() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        openSearch: () => setIsSearchOpen(true),
      }}
    >
      <CartDrawer />

      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </SearchContext.Provider>
  );
}
