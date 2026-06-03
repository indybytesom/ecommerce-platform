"use client";

import { useAppSelector } from "@/store/hooks";

export default function DashboardRecentReviews() {
  const reviews = useAppSelector(
    (state) => state.reviews.reviews,
  );

  const recentReviews = reviews.slice(0, 3);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Reviews
      </h2>

      {recentReviews.length === 0 ? (
        <p className="text-sm text-gray-500">
          No reviews yet.
        </p>
      ) : (
        <div className="space-y-5">
          {recentReviews.map((review) => (
            <div
              key={review.id}
              className="border-b pb-4"
            >
              <p className="font-medium">
                {review.userName}
              </p>

              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}