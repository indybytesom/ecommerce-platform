"use client";

import { selectCartSubtotal } from "../cartSelectors";

import { useAppSelector } from "@/store/hooks";

export default function CartSummary() {
  const subtotal = useAppSelector(selectCartSubtotal);

  return (
    <div className="rounded-2xl border border-gray-200 p-6">
      <h2 className="text-xl font-semibold">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>

          <span>${subtotal}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Shipping</span>

          <span>Free</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>

            <span>${subtotal}</span>
          </div>
        </div>
      </div>

      <button className="mt-6 w-full rounded-xl bg-black py-4 text-white">
        Proceed to Checkout
      </button>
    </div>
  );
}
