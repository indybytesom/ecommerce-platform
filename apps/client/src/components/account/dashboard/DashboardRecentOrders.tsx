"use client";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function DashboardRecentOrders() {
  const orders = useAppSelector((state) => state.orders.orders);
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Orders</h2>

        <Link href="/orders" className="text-sm font-medium">
          View All
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <p className="text-sm text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <p className="font-medium">#{order.id.slice(0, 8)}</p>

                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <p className="font-semibold">${order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
