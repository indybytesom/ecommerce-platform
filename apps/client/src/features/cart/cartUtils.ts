import { CartItem } from "./cartTypes";

export const findCartItemIndex = (items: CartItem[], item: CartItem) => {
  return items.findIndex(
    (cartItem) =>
      cartItem.productId === item.productId &&
      cartItem.size === item.size &&
      cartItem.color === item.color,
  );
};

export const calculateCartSubtotal = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateCartQuantity = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};
