import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrdersState } from "./orderTypes";

const initialState: OrdersState = {
  orders: [],
  latestOrder: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    createOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      state.latestOrder = action.payload;
    },

    clearLatestOrder: (state) => {
      state.latestOrder = null;
    },
  },
});

export const { createOrder, clearLatestOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
