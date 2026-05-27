import { RootState } from "@/store/store";

export const selectWishlistItems = (state: RootState) => state.wishlist.items;

export const selectWishlistCount = (state: RootState) =>
  state.wishlist.items.length;

export const selectIsInWishlist = (productId: number) => (state: RootState) =>
  state.wishlist.items.some((item) => item.id === productId);
