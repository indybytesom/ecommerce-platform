import { CartState } from "@/features/cart/cartTypes";

const CART_STORAGE_KEY = "cart";

export const loadCartState = (): CartState | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const serializedState = localStorage.getItem(CART_STORAGE_KEY);

    if (!serializedState) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Failed to load cart state:", error);

    return undefined;
  }
};

export const saveCartState = (state: CartState) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save cart state:", error);
  }
};
