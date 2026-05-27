import { Product } from "@/types/product";

export type WishlistItem = Product;

export interface WishlistState {
  items: WishlistItem[];
}