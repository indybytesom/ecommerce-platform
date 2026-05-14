import { RootState } from "@/store/store";

export const selectShippingAddress = (state: RootState) =>
  state.checkout.shippingAddress;

export const selectPaymentMethod = (state: RootState) =>
  state.checkout.paymentMethod;

export const selectCheckoutProcessing = (state: RootState) =>
  state.checkout.isProcessing;

export const selectShippingComplete = (state: RootState) =>
  state.checkout.isShippingComplete;
