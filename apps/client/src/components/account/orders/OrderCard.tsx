import Link from "next/link";
import { Order } from "@/features/orders/orderTypes";
import Badge from "@/components/ui/Badge";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>

          <h2 className="mt-1 font-semibold">#{order.id.slice(0, 8)}</h2>

          <p className="mt-3 text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <Badge variant="warning">{order.status}</Badge>

          <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>

          <Link
            href={`/orders/${order.id}`}
            className="mt-2 text-sm font-medium text-black underline underline-offset-4"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="mt-5 border-t pt-5">
        <div className="flex flex-wrap gap-4">
          {order.items.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex items-center gap-3"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-14 w-14 rounded-lg object-cover"
              />

              <div>
                <p className="text-sm font-medium">{item.title}</p>

                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
