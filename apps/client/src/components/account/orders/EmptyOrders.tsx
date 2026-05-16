// import Link from "next/link";

// export default function EmptyOrders() {
//   return (
//     <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center">
//       <h2 className="text-2xl font-semibold">
//         No Orders Yet
//       </h2>

//       <p className="mt-3 max-w-md text-sm text-gray-500">
//         {`You haven't placed any orders yet.
//         Start shopping to see your orders
//         here.`}
//       </p>

//       <Link
//         href="/shop"
//         className="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
//       >
//         Continue Shopping
//       </Link>
//     </div>
//   );
// }

import EmptyState from "@/components/common/EmptyState";

export default function EmptyOrders() {
  return (
    <EmptyState
      title="No Orders Yet"
      description="You haven't placed any orders yet. Start shopping to see your orders here."
      buttonText="Continue Shopping"
      href="/shop"
    />
  );
}
