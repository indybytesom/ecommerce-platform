import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecentlyViewedItem, RecentlyViewedState } from "./recentlyViewedTypes";
import { loadRecentlyViewedState } from "@/store/persistence";

const persistedRecentlyViewed = loadRecentlyViewedState();

const initialState: RecentlyViewedState = persistedRecentlyViewed || {
  items: [],
};

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    addRecentlyViewed: (state, action: PayloadAction<RecentlyViewedItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.items.unshift(action.payload);
      if (state.items.length > 8) {
        state.items = state.items.slice(0, 8);
      }
    },

    clearRecentlyViewed: (state) => {
      state.items = [];
    },
  },
});

export const { addRecentlyViewed, clearRecentlyViewed } =
  recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;
