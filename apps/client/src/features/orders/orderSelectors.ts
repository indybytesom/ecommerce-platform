import { RootState } from "@/store/store";

export const selectOrders = (state: RootState) => state.orders.orders;

export const selectLatestOrder = (state: RootState) => state.orders.latestOrder;
