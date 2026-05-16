"use client";

import Link from "next/link";

import { useAppSelector } from "@/store/hooks";

import {
  selectLatestOrder,
  selectTotalOrders,
} from "@/features/orders/orderSelectors";

export default function DashboardPage() {
  const totalOrders = useAppSelector(selectTotalOrders);

  const latestOrder = useAppSelector(selectLatestOrder);

  return (
    <main className="min-h-screen px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Dashboard</h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your account and track your recent activity.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>

            <h2 className="mt-3 text-3xl font-bold">{totalOrders}</h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Latest Order</p>

            <h2 className="mt-3 text-lg font-semibold">
              {latestOrder ? `#${latestOrder.id.slice(0, 8)}` : "No Orders"}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Quick Actions</p>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/orders"
                className="text-sm font-medium text-black underline underline-offset-4"
              >
                View Orders
              </Link>

              <Link
                href="/shop"
                className="text-sm font-medium text-black underline underline-offset-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {latestOrder && (
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Recent Order</p>

                <h2 className="mt-2 text-xl font-semibold">
                  #{latestOrder.id.slice(0, 8)}
                </h2>
              </div>

              <Link
                href={`/orders/${latestOrder.id}`}
                className="text-sm font-medium text-black underline underline-offset-4"
              >
                View Details
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {latestOrder.items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-medium">{item.title}</h3>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
