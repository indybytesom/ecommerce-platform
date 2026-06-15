import { Check } from "lucide-react";
import { OrderStatus } from "@/features/orders/orderTypes";

interface OrderTimelineProps {
  status: OrderStatus;
}

const statuses: OrderStatus[] = [
  "pending",
  "processing",
  "paid",
  "shipped",
  "delivered",
];

export default function OrderTimeline({ status }: OrderTimelineProps) {
  const currentIndex = status === "cancelled" ? -1 : statuses.indexOf(status);

  return (
    <div className="mt-10">
      <h2 className="mb-6 text-lg font-semibold">Order Progress</h2>

      {status === "cancelled" && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          This order has been cancelled.
        </div>
      )}

      <div className="relative space-y-4">
        {statuses.map((step, index) => {
          const completed = index <= currentIndex;

          return (
            <div key={step} className="flex items-center gap-4">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                  completed
                    ? "border-black bg-black text-white"
                    : "border-gray-300 text-gray-300"
                }`}
              >
                {completed && <Check size={16} />}
              </div>

              <span
                className={`capitalize ${
                  completed ? "font-medium text-black" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
