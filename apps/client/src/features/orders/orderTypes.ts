import { CartItem } from "@/features/cart/cartTypes";

import {
  PaymentMethod,
  ShippingAddress,
} from "@/features/checkout/checkoutTypes";

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered";

export type Order = {
  id: string;

  items: CartItem[];

  shippingAddress: ShippingAddress;

  paymentMethod: PaymentMethod;

  subtotal: number;

  shipping: number;

  total: number;

  createdAt: string;

  status: OrderStatus;
};

export type OrdersState = {
  orders: Order[];

  latestOrder: Order | null;
};
