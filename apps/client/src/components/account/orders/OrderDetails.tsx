import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Order } from "@/features/orders/orderTypes";
import OrderItemRow from "./OrderItemRow";
import Badge from "@/components/ui/Badge";
import OrderTimeline from "./OrderTimeline";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";
import { cancelOrder } from "@/features/orders/ordersSlice";
import { getStatusVariant } from "@/features/orders/orderUtils";
import { addToCart } from "@/features/cart/cartSlice";
import { openCart } from "@/features/cart/cartSlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const dispatch = useAppDispatch();
  const canCancel = order.status === "pending" || order.status === "processing";
  const [isReordering, setIsReordering] = useState(false);

  const handleCancelOrder = () => {
    dispatch(cancelOrder(order.id));

    toast.success("Order cancelled successfully");
  };

  const handleReorder = () => {
    if (isReordering) return;
    setIsReordering(true);
    order.items.forEach((item) => {
      dispatch(
        addToCart({
          ...item,
        }),
      );
    });
    dispatch(openCart());
    toast.success("Items added to cart");
    setTimeout(() => {
      setIsReordering(false);
    }, 500);
  };

  const handleDownloadPdf = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.setFontSize(22);
    pdf.text("Ecommerce Platform", 14, 20);

    pdf.setFontSize(16);
    pdf.text("Invoice", 14, 30);
    pdf.setFontSize(11);
    pdf.text(`Order #: ${order.id.slice(0, 8)}`, 14, 35);
    pdf.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 42);
    pdf.text(`Customer: ${order.shippingAddress.fullName}`, 14, 49);
    pdf.text(`Email: ${order.shippingAddress.email}`, 14, 56);

    autoTable(pdf, {
      startY: 70,
      head: [["Product", "Size", "Color", "Qty", "Price"]],
      body: order.items.map((item) => [
        item.title,
        item.size ?? "N/A",
        item.color ?? "N/A",
        item.quantity.toString(),
        `$${(item.price * item.quantity).toFixed(2)}`,
      ]),
    });

    const finalY =
      (
        pdf as jsPDF & {
          lastAutoTable?: { finalY: number };
        }
      ).lastAutoTable?.finalY ?? 100;

    pdf.text(`Subtotal: $${order.subtotal.toFixed(2)}`, 14, finalY + 15);
    pdf.text(`Shipping: $${order.shipping.toFixed(2)}`, 14, finalY + 25);
    pdf.setFontSize(13);
    pdf.text(`Total: $${order.total.toFixed(2)}`, 14, finalY + 40);

    pdf.save(
      `invoice-${order.id.slice(0, 8)}-${new Date(order.createdAt).getFullYear()}.pdf`,
    );
    toast.success("Invoice downloaded");
  };

  return (
    <div>
      <Link
        href="/orders"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
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

          <div className="flex flex-col items-start gap-3 md:items-end">
            <Badge variant={getStatusVariant(order.status)}>
              {order.status}
            </Badge>

            {canCancel && (
              <button
                onClick={handleCancelOrder}
                className="rounded-full border border-red-500 px-2 py-1 text-xs font-medium text-red-500 transition hover:bg-red-50"
              >
                Cancel Order
              </button>
            )}

            <button
              onClick={handleDownloadPdf}
              className="rounded-full border border-black px-2 py-1 text-xs font-medium transition hover:bg-black hover:text-white"
            >
              Download Invoice
            </button>

            <button
              onClick={handleReorder}
              disabled={isReordering}
              className="rounded-full bg-black px-2 py-1 text-xs font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isReordering ? "Reordering..." : "Reorder Items"}
            </button>
          </div>
        </div>

        {/* Order Time line */}
        <OrderTimeline status={order.status} />

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
            {order.items.map((item, i) => (
              <OrderItemRow key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
