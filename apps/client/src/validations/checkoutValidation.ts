import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),

  email: z.string().email("Enter a valid email"),

  phone: z.string().min(8, "Phone number is required"),

  address: z.string().min(5, "Address is required"),

  city: z.string().min(2, "City is required"),

  postalCode: z.string().min(3, "Postal code is required"),

  country: z.string().min(2, "Country is required"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
