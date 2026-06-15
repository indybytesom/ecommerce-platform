import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "./orderTypes";
import { loadOrdersState } from "@/store/persistence";

export interface OrdersState {
  orders: Order[];
  latestOrder: Order | null;
}

const persistedOrders = loadOrdersState();

const initialState: OrdersState = persistedOrders || {
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

    clearOrders: (state) => {
      state.orders = [];

      state.latestOrder = null;
    },

    cancelOrder: (state, action: PayloadAction<string>) => {
      const order = state.orders.find((item) => item.id === action.payload);

      if (order) {
        order.status = "cancelled";

        if (state.latestOrder && state.latestOrder.id === action.payload) {
          state.latestOrder.status = "cancelled";
        }
      }
    },
  },
});

export const { createOrder, clearLatestOrder, clearOrders, cancelOrder } =
  ordersSlice.actions;

export default ordersSlice.reducer;
