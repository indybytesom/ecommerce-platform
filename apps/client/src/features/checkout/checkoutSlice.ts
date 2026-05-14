import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CheckoutState, ShippingAddress, PaymentMethod } from "./checkoutTypes";

const initialState: CheckoutState = {
  shippingAddress: null,
  paymentMethod: "card",
  isProcessing: false,
  isShippingComplete: false,
};

const checkoutSlice = createSlice({
  name: "checkout",

  initialState,

  reducers: {
    setShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
      state.isShippingComplete = true;
    },

    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },

    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },

    resetCheckout: (state) => {
      state.shippingAddress = null;
      state.paymentMethod = "card";
      state.isProcessing = false;
      state.isShippingComplete = false;
    },

    resetShippingAddress: (state) => {
      state.shippingAddress = null;
      state.isShippingComplete = false;
    },
  },
});

export const {
  setShippingAddress,
  setPaymentMethod,
  setProcessing,
  resetCheckout,
  resetShippingAddress,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
