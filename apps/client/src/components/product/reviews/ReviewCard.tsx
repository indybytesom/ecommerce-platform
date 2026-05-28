"use client";

import { motion } from "framer-motion";

import { Review } from "@/features/reviews/reviewsTypes";

import StarRating from "./StarRating";

import { formatReviewDate } from "@/features/reviews/reviewsUtils";

type ReviewCardProps = {
  review: Review;

  index: number;
};

export default function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
      }}
      className="rounded-3xl border border-gray-200 bg-white p-6"
    >
      {/* TOP */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-semibold">{review.userName}</h3>

          <p className="mt-1 text-sm text-gray-500">
            {formatReviewDate(review.createdAt)}
          </p>
        </div>

        <StarRating rating={review.rating} size={16} />
      </div>

      {/* COMMENT */}
      <p className="mt-5 leading-7 text-gray-600">{review.comment}</p>
    </motion.div>
  );
}
