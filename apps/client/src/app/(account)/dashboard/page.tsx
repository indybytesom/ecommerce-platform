"use client";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import DashboardStats from "@/components/account/dashboard/DashboardStats";
import DashboardRecentOrders from "@/components/account/dashboard/DashboardRecentOrders";
import DashboardRecentReviews from "@/components/account/dashboard/DashboardRecentReviews";
import DashboardRecentlyViewed from "@/components/account/dashboard/DashboardRecentlyViewed";

export default function DashboardPage() {
  return (
    <main className="min-h-screen py-10 md:px-4 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Dashboard</h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your account and track your recent activity.
          </p>
        </div>
        <DashboardStats />

        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          <DashboardRecentOrders />
          <DashboardRecentReviews />
          {/* <div className="mt-8">
          </div> */}
            <DashboardRecentlyViewed />
        </div>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Quick Actions</h2>

          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href="/orders"
              className="rounded-full border border-black px-5 py-3 text-sm font-medium"
            >
              View Orders
            </Link>

            <Link
              href="/wishlist"
              className="rounded-full border border-black px-5 py-3 text-sm font-medium"
            >
              Wishlist
            </Link>

            <Link
              href="/shop"
              className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
