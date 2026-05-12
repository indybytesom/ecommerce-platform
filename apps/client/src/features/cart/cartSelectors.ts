import { RootState } from "@/store/store";

import { calculateCartQuantity, calculateCartSubtotal } from "./cartUtils";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartIsOpen = (state: RootState) => state.cart.isCartOpen;

export const selectCartSubtotal = (state: RootState) =>
  calculateCartSubtotal(state.cart.items);

export const selectCartQuantity = (state: RootState) =>
  calculateCartQuantity(state.cart.items);
