import { RootState } from "@/store/store";

export const selectRecentlyViewedItems = (state: RootState) =>
  state.recentlyViewed.items;
