export type ShippingAddress = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type PaymentMethod = "card" | "cod";

export type CheckoutState = {
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod;
  isProcessing: boolean;
  isShippingComplete: boolean;
};
