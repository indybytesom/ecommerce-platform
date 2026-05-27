import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistItem, WishlistState } from "./wishlistTypes";
import { loadWishlistState } from "@/store/persistence";

const persistedWishlist = loadWishlistState();

const initialState: WishlistState = persistedWishlist || {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);

      if (!exists) {
        state.items.unshift(action.payload);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
