// import { configureStore } from "@reduxjs/toolkit";

// import cartReducer from "@/features/cart/cartSlice";

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import { loadCartState, saveCartState } from "./persistence";

const persistedCart = loadCartState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },

  preloadedState: persistedCart
    ? {
        cart: persistedCart,
      }
    : undefined,
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
