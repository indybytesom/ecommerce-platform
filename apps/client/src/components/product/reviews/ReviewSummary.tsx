"use client";

import StarRating from "./StarRating";

type ReviewSummaryProps = {
  averageRating: number;

  totalReviews: number;
};

export default function ReviewSummary({
  averageRating,
  totalReviews,
}: ReviewSummaryProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT */}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
            Customer Reviews
          </p>

          <div className="mt-3 flex items-center gap-4">
            <span className="text-5xl font-bold">
              {averageRating.toFixed(1)}
            </span>

            <div>
              <StarRating rating={Math.round(averageRating)} size={20} />

              <p className="mt-1 text-sm text-gray-500">
                Based on {totalReviews} review
                {totalReviews !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
          Verified Product Feedback
        </div>
      </div>
    </div>
  );
}
