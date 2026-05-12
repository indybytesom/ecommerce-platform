import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem, CartState } from "./cartTypes";
import { findCartItemIndex } from "./cartUtils";

const initialState: CartState = {
  items: [],
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = findCartItemIndex(state.items, action.payload);

      if (existingItemIndex >= 0) {
        const existingItem = state.items[existingItemIndex];

        existingItem.quantity += action.payload.quantity;

        if (existingItem.quantity > existingItem.stock) {
          existingItem.quantity = existingItem.stock;
        }
      } else {
        state.items.push(action.payload);
      }

      state.isCartOpen = true;
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === action.payload.productId &&
            item.size === action.payload.size &&
            item.color === action.payload.color
          ),
      );
    },

    incrementQuantity: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = findCartItemIndex(state.items, action.payload);

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];

        if (item.quantity < item.stock) {
          item.quantity += 1;
        }
      }
    },

    decrementQuantity: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = findCartItemIndex(state.items, action.payload);

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];

        if (item.quantity > 1) {
          item.quantity -= 1;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

    openCart: (state) => {
      state.isCartOpen = true;
    },

    closeCart: (state) => {
      state.isCartOpen = false;
    },

    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
