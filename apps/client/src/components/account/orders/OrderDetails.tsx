import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Order } from "@/features/orders/orderTypes";
import OrderItemRow from "./OrderItemRow";
import Badge from "@/components/ui/Badge";

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div>
      <Link
        href="/orders"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
      >
        <ArrowLeft size={16} />
        Back to Orders
      </Link>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>

            <h1 className="mt-1 text-2xl font-bold">#{order.id.slice(0, 8)}</h1>

            <p className="mt-3 text-sm text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <Badge variant="warning">{order.status}</Badge>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">Shipping Information</h2>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>{order.shippingAddress.fullName}</p>

              <p>{order.shippingAddress.email}</p>

              <p>{order.shippingAddress.phone}</p>

              <p>{order.shippingAddress.address}</p>

              <p>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>

              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Payment Summary</h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Payment Method</span>

                <span className="font-medium uppercase">
                  {order.paymentMethod}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Subtotal</span>

                <span>${order.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Shipping</span>

                <span>${order.shipping.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between border-t pt-3 text-base font-semibold">
                <span>Total</span>

                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold">Order Items</h2>

          <div className="mt-4">
            {order.items.map((item) => (
              <OrderItemRow
                key={`${item.productId}-${item.size}`}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
