// import Container from "@/components/ui/Container";
// import CheckoutSummary from "./CheckoutSummary";
// import ShippingForm from "./ShippingForm";
// import PaymentForm from "./PaymentForm";

// export default function CheckoutPageView() {
//   return (
//     <main className="py-16 lg:py-24">
//       <Container>
//         {/* HEADER */}
//         <div className="mb-12">
//           <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
//             Checkout
//           </p>

//           <h1 className="mt-4 text-4xl font-bold">Complete Your Order</h1>
//         </div>

//         {/* LAYOUT */}
//         <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
//           {/* LEFT */}
//           <div className="space-y-10">
//             <ShippingForm />

//             <PaymentForm />
//           </div>

//           {/* RIGHT */}
//           <aside className="h-fit">
//             <CheckoutSummary />
//           </aside>
//         </div>
//       </Container>
//     </main>
//   );
// }



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
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-8">
            <ShippingForm />

            <PaymentForm />
          </div>

          {/* RIGHT */}
          <aside className="h-fit">
            <CheckoutSummary />
          </aside>
        </div>
      </Container>
    </main>
  );
}