import { RootState } from "@/store/store";

export const selectOrders = (state: RootState) => state.orders.orders;

export const selectLatestOrder = (state: RootState) => state.orders.latestOrder;

export const selectTotalOrders = (state: RootState) =>
  state.orders.orders.length;

export const selectOrderById = (orderId: string) => (state: RootState) =>
  state.orders.orders.find((order) => order.id === orderId);

export const selectHasOrders = (state: RootState) =>
  state.orders.orders.length > 0;
