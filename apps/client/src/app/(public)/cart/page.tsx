"use client";

import CartItem from "@/features/cart/components/CartItem";
import CartSummary from "@/features/cart/components/CartSummary";

import { selectCartItems } from "@/features/cart/cartSelectors";

import { useAppSelector } from "@/store/hooks";

import Container from "@/components/ui/Container";

export default function CartPage() {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <main className="py-16 lg:py-24">
      <Container>
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>

          <p className="mt-3 text-gray-500">
            Review your items before checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">
            <p className="text-lg font-medium">Your cart is empty</p>

            <p className="mt-2 text-sm text-gray-500">
              Add products to continue shopping.
            </p>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
            {/* ITEMS */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <CartItem key={`${item.productId}-${item.size}`} item={item} />
              ))}
            </div>

            {/* SUMMARY */}
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <CartSummary />
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
