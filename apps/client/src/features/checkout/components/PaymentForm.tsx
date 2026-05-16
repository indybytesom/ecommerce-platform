"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreditCard } from "lucide-react";
import { Landmark } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectPaymentMethod,
  selectCheckoutProcessing,
  selectShippingComplete,
  selectShippingAddress,
} from "../checkoutSelectors";
import {
  setPaymentMethod,
  setProcessing,
  resetCheckout,
} from "../checkoutSlice";
import { clearCart } from "@/features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  paymentSchema,
  PaymentFormData,
} from "@/validations/paymentValidation";
import { createOrder } from "@/features/orders/ordersSlice";
import {
  selectCartItems,
  selectCartSubtotal,
} from "@/features/cart/cartSelectors";
import { toast } from "sonner";

export default function PaymentForm() {
  const dispatch = useAppDispatch();
  const paymentMethod = useAppSelector(selectPaymentMethod);
  const router = useRouter();
  const isProcessing = useAppSelector(selectCheckoutProcessing);
  const isShippingComplete = useAppSelector(selectShippingComplete);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const {
    register,
    formState: { errors, isValid },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
  });
  const cartItems = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const shippingAddress = useAppSelector(selectShippingAddress);

  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);

    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || "";

    setCardNumber(formatted);
  };

  const handleExpiryChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);

    let formatted = cleaned;

    if (cleaned.length >= 3) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }

    setExpiry(formatted);
  };

  const handleCvvChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);

    setCvv(cleaned);
  };

  const handlePlaceOrder = async () => {
    if (!isShippingComplete || !shippingAddress) {
      alert("Please complete shipping details first.");

      return;
    }

    dispatch(setProcessing(true));
    const shipping = subtotal > 200 ? 0 : 20;

    const order = {
      id: crypto.randomUUID(),
      items: cartItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      total: subtotal + shipping,
      createdAt: new Date().toISOString(),
      status: "processing" as const,
    };

    dispatch(createOrder(order));
    toast.success("Order placed successfully");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch(clearCart());
    dispatch(resetCheckout());
    dispatch(setProcessing(false));
    router.push("/checkout/success");
  };

  return (
    <div className="rounded-3xl border p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Payment</h2>

        <p className="mt-2 text-sm text-gray-500">
          Select your payment method.
        </p>
      </div>

      {/* METHODS */}
      <div className="space-y-4">
        {/* CARD */}
        <label
          onClick={() => dispatch(setPaymentMethod("card"))}
          className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition ${
            paymentMethod === "card"
              ? "border-black bg-gray-50"
              : "hover:border-black"
          }`}
        >
          <div
            className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${
              paymentMethod === "card" ? "border-black" : "border-gray-300"
            }`}
          >
            <div
              className={`h-2.5 w-2.5 rounded-full bg-black transition ${
                paymentMethod === "card" ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <CreditCard size={20} />

              <p className="font-medium">Credit / Debit Card</p>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Pay securely using your card.
            </p>

            {/* MOCK CARD UI */}
            {paymentMethod === "card" && (
              <div className="mt-4 grid gap-3">
                <div>
                  <input
                    {...register("cardNumber")}
                    value={cardNumber}
                    onChange={(e) => {
                      handleCardNumberChange(e.target.value);

                      register("cardNumber").onChange(e);
                    }}
                    placeholder="4141 4141 4141 4141"
                    className={`w-full rounded-xl border px-4 py-2.5 outline-none transition ${
                      errors.cardNumber
                        ? "border-red-500"
                        : "focus:border-black"
                    }`}
                  />

                  {errors.cardNumber && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <input
                      {...register("expiry")}
                      value={expiry}
                      onChange={(e) => {
                        handleExpiryChange(e.target.value);

                        register("expiry").onChange(e);
                      }}
                      placeholder="12/30"
                      className={`w-full rounded-xl border px-4 py-2.5 outline-none transition ${
                        errors.expiry ? "border-red-500" : "focus:border-black"
                      }`}
                    />

                    {errors.expiry && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.expiry.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("cvv")}
                      value={cvv}
                      onChange={(e) => {
                        handleCvvChange(e.target.value);

                        register("cvv").onChange(e);
                      }}
                      placeholder="123"
                      className={`w-full rounded-xl border px-4 py-2.5 outline-none transition ${
                        errors.cvv ? "border-red-500" : "focus:border-black"
                      }`}
                    />

                    {errors.cvv && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </label>

        {/* COD */}
        <label
          onClick={() => dispatch(setPaymentMethod("cod"))}
          className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition ${
            paymentMethod === "cod"
              ? "border-black bg-gray-50"
              : "hover:border-black"
          }`}
        >
          <div
            className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${
              paymentMethod === "cod" ? "border-black" : "border-gray-300"
            }`}
          >
            <div
              className={`h-2.5 w-2.5 rounded-full bg-black transition ${
                paymentMethod === "cod" ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Landmark size={20} />

              <p className="font-medium">Cash on Delivery</p>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Pay when your order arrives.
            </p>
          </div>
        </label>
      </div>

      {/* SECURITY */}
      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
        <ShieldCheck size={18} />

        <p>Your payment information is encrypted and secure.</p>
      </div>

      {/* PLACE ORDER */}
      <button
        onClick={handlePlaceOrder}
        disabled={
          isProcessing ||
          !isShippingComplete ||
          (paymentMethod === "card" && !isValid)
        }
        className="mt-6 w-full rounded-2xl bg-black px-6 py-4 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isProcessing
          ? "Processing Order..."
          : !isShippingComplete
            ? "Complete Shipping First"
            : "Place Order"}
      </button>
    </div>
  );
}
