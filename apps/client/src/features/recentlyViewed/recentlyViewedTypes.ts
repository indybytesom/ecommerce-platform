import { Product } from "@/types/product";

export type RecentlyViewedItem = Product;

export type RecentlyViewedState = {
  items: RecentlyViewedItem[];
};
