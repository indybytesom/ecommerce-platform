"use client";

import Image from "next/image";

import {
  selectCartItems,
  selectCartSubtotal,
} from "@/features/cart/cartSelectors";

import { useAppSelector } from "@/store/hooks";

export default function CheckoutSummary() {
  const cartItems = useAppSelector(selectCartItems);

  const subtotal = useAppSelector(selectCartSubtotal);

  const shipping = subtotal > 200 ? 0 : 20;

  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="rounded-3xl border p-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        <p className="mt-6 text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border p-6">
      {/* HEADER */}
      <h2 className="text-xl font-semibold">Order Summary</h2>

      {/* ITEMS */}
      <div className="mt-6 space-y-5">
        {cartItems.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex gap-4">
            {/* IMAGE */}
            <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* INFO */}
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium">{item.title}</h3>

                  {item.size && (
                    <p className="mt-1 text-sm text-gray-500">
                      Size: {item.size}
                    </p>
                  )}

                  <p className="mt-1 text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">${item.price * item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOTALS */}
      <div className="mt-8 space-y-3 border-t pt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>

          <span>${subtotal}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Shipping</span>

          <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
        </div>

        <div className="flex items-center justify-between border-t pt-4 text-lg font-semibold">
          <span>Total</span>

          <span>${total}</span>
        </div>
      </div>
    </div>
  );
}
