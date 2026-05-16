// "use client";
// import { notFound } from "next/navigation";
// import { useAppSelector } from "@/store/hooks";
// import { selectOrderById } from "@/features/orders/orderSelectors";
// import OrderDetails from "@/components/account/orders/OrderDetails";

// interface OrderDetailsPageProps {
//   params: {
//     id: string;
//   };
// }

// export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
//   const order = useAppSelector(selectOrderById(params.id));
//   console.log("order ::", order);
//   if (!order) {
//     notFound();
//   }

//   return (
//     <main className="min-h-screen px-4 py-10 md:px-8">
//       <div className="mx-auto max-w-5xl">
//         <OrderDetails order={order} />
//       </div>
//     </main>
//   );
// }

"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectOrderById } from "@/features/orders/orderSelectors";
import OrderDetails from "@/components/account/orders/OrderDetails";

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = use(params);
  const order = useAppSelector(selectOrderById(id));

  // console.log("id ::", id);
  // console.log("order ::", order);

  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-screen px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">
        <OrderDetails order={order} />
      </div>
    </main>
  );
}
