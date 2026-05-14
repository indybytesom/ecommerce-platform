import { z } from "zod";

export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(19, "Card number must be 16 digits")
    .regex(/^(\d{4} ){3}\d{4}$/, "Invalid card number format"),

  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry format"),

  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
