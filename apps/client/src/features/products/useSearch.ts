"use client";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { searchProducts } from "./searchUtils";

export function useSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  const results = useMemo(() => {
    return searchProducts(debouncedQuery);
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    results,
  };
}
