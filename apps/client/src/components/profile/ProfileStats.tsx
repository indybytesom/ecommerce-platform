"use client";
import { useAppSelector } from "@/store/hooks";
import { selectWishlistCount } from "@/features/wishlist/wishlistSelectors";
import { selectUser } from "@/features/auth/authSelectors";
import { selectProfile } from "@/features/profile/profileSelectors";

export default function ProfileStats() {
  const wishlistCount = useAppSelector(selectWishlistCount);
  const user = useAppSelector(selectUser);
  const profile = useAppSelector(selectProfile);
  const ordersCount = useAppSelector((state) => state.orders.orders.length);
  const reviewsCount = useAppSelector((state) => state.reviews.reviews.length);
  let completedFields = 0;

  if (profile.firstName) completedFields++;
  if (profile.lastName) completedFields++;
  if (profile.phone) completedFields++;
  if (user?.email) completedFields++;

  const completion = Math.round((completedFields / 4) * 100);

  return (
    <div className="mb-8 grid gap-4 lg:grid-cols-4">
      <div className="rounded-3xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">Orders</p>

        <p className="mt-2 text-3xl font-bold">{ordersCount}</p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">Wishlist</p>

        <p className="mt-2 text-3xl font-bold">{wishlistCount}</p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">Reviews</p>

        <p className="mt-2 text-3xl font-bold">{reviewsCount}</p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">Profile</p>

        <p className="mt-2 text-3xl font-bold">{completion}%</p>
      </div>
    </div>
  );
}
