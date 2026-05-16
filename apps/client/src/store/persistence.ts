import { CartState } from "@/features/cart/cartTypes";
import { AuthState } from "@/features/auth/authTypes";
import { OrdersState } from "@/features/orders/ordersSlice";

const STORAGE_KEYS = {
  CART: "cart",
  AUTH: "auth",
  ORDERS: "orders",
};

export const loadState = <T>(key: string): T | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const serializedState = localStorage.getItem(key);

    if (!serializedState) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    console.error(`Failed to load ${key}:`, error);

    return undefined;
  }
};

export const saveState = <T>(key: string, state: T) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
  }
};

export const loadCartState = () => loadState<CartState>(STORAGE_KEYS.CART);

export const saveCartState = (state: CartState) =>
  saveState(STORAGE_KEYS.CART, state);

export const loadAuthState = () => loadState<AuthState>(STORAGE_KEYS.AUTH);

export const saveAuthState = (state: AuthState) =>
  saveState(STORAGE_KEYS.AUTH, state);

export const loadOrdersState = () =>
  loadState<OrdersState>(STORAGE_KEYS.ORDERS);

export const saveOrdersState = (state: OrdersState) =>
  saveState(STORAGE_KEYS.ORDERS, state);
