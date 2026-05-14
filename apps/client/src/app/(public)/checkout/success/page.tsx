import Link from "next/link";

import Container from "@/components/ui/Container";

export default function CheckoutSuccessPage() {
  return (
    <main className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border p-10 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-3xl text-white">
            ✓
          </div>

          <h1 className="mt-8 text-4xl font-bold">Order Placed Successfully</h1>

          <p className="mt-4 text-gray-600">
            Thank you for your purchase. Your order is being processed.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/shop"
              className="rounded-xl bg-black px-8 py-4 text-white transition hover:opacity-90"
            >
              Continue Shopping
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-black px-8 py-4 transition hover:bg-black hover:text-white"
            >
              Back Home
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
