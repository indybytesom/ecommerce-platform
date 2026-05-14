import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import { loadCartState, saveCartState } from "./persistence";
import authReducer from "@/features/auth/authSlice";
import checkoutReducer from "@/features/checkout/checkoutSlice";
import ordersReducer from "@/features/orders/ordersSlice";

const persistedCart = loadCartState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    checkout: checkoutReducer,
    orders: ordersReducer,
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
