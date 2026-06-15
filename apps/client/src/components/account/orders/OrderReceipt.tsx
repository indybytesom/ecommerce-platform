import { Order } from "@/features/orders/orderTypes";

interface OrderReceiptProps {
  order: Order;
}

export default function OrderReceipt({ order }: OrderReceiptProps) {
  return (
    <div
      id="print-receipt"
      className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6"
    >
      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold">Receipt</h2>

        <p className="mt-2 text-sm text-gray-500">
          Order #{order.id.slice(0, 8)}
        </p>

        <p className="text-sm text-gray-500">
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* ITEMS */}
      <div className="mt-6">
        <h3 className="font-semibold">Items Purchased</h3>

        <div className="mt-4 space-y-4">
          {order.items.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium">{item.title}</p>

                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>

              <p className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TOTALS */}
      <div className="mt-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>

          <span>${order.subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>

          <span>${order.shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between border-t pt-3 text-lg font-semibold">
          <span>Total</span>

          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
