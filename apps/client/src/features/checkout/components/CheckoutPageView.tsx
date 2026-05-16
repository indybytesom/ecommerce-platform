import Container from "@/components/ui/Container";
import CheckoutSummary from "./CheckoutSummary";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";

export default function CheckoutPageView() {
  return (
    <main className="py-12 lg:py-20">
      <Container>
        {/* HEADER */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Checkout
          </p>

          <h1 className="mt-3 text-3xl font-bold lg:text-4xl">
            Complete Your Order
          </h1>
        </div>

        {/* LAYOUT */}
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-8">
            <ShippingForm />

            <PaymentForm />
          </div>

          {/* RIGHT */}
          <aside className="h-fit lg:sticky lg:top-28">
            <CheckoutSummary />
          </aside>
        </div>
      </Container>
    </main>
  );
}