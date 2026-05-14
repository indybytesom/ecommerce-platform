"use client";
import { X } from "lucide-react";
import { closeCart } from "../cartSlice";
import { selectCartIsOpen, selectCartItems } from "../cartSelectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import Link from "next/link";

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const isCartOpen = useAppSelector(selectCartIsOpen);
  const cartItems = useAppSelector(selectCartItems);

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => dispatch(closeCart())}
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isCartOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>

          <button onClick={() => dispatch(closeCart())}>
            <X />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <CartItem key={`${item.productId}-${item.size}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div className="border-t p-6">
            {/* <CartSummary /> */}

            <div className="mt-4 space-y-3">
              <Link
                href="/cart"
                onClick={() => dispatch(closeCart())}
                className="flex w-full items-center justify-center rounded-xl border border-black py-4"
              >
                View Cart
              </Link>

              {/* <button className="w-full rounded-xl bg-black py-4 text-white">
                Checkout
              </button> */}
              <Link
                href="/checkout"
                onClick={() => dispatch(closeCart())}
                className="block text-center w-full rounded-xl bg-black py-4 text-white"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
