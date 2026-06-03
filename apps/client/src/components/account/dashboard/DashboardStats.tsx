"use client";
import { useAppSelector } from "@/store/hooks";
import { selectWishlistCount } from "@/features/wishlist/wishlistSelectors";

export default function DashboardStats() {
  const ordersCount = useAppSelector((state) => state.orders.orders.length);
  const reviewsCount = useAppSelector((state) => state.reviews.reviews.length);
  const wishlistCount = useAppSelector(selectWishlistCount);
  const recentlyViewedCount = useAppSelector(
    (state) => state.recentlyViewed.items.length,
  );

  const stats = [
    {
      label: "Orders",
      value: ordersCount,
    },
    {
      label: "Wishlist",
      value: wishlistCount,
    },
    {
      label: "Reviews",
      value: reviewsCount,
    },
    {
      label: "Recently Viewed",
      value: recentlyViewedCount,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-3xl border border-gray-200 bg-white p-6"
        >
          <p className="text-sm text-gray-500">{stat.label}</p>

          <p className="mt-3 text-4xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
