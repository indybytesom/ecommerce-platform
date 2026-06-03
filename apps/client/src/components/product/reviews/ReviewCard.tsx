"use client";
import { motion } from "framer-motion";
import { Review } from "@/features/reviews/reviewsTypes";
import StarRating from "./StarRating";
import { formatReviewDate } from "@/features/reviews/reviewsUtils";
import { selectUser } from "@/features/auth/authSelectors";
import { deleteReview } from "@/features/reviews/reviewsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import EditReviewModal from "./EditReviewModal";
import { updateReview } from "@/features/reviews/reviewsSlice";
import { toast } from "sonner";

type ReviewCardProps = {
  review: Review;
  index: number;
};

export default function ReviewCard({ review, index }: ReviewCardProps) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const isOwner = currentUser?.id === review.userId;
  const [isEditing, setIsEditing] = useState(false);

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

      {isOwner && (
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => {
              dispatch(deleteReview(review.id));
            }}
            className="flex items-center gap-2 text-sm text-red-500 hover:opacity-80"
          >
            <Trash2 size={14} />
            Delete
          </button>

          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:opacity-80"
          >
            <Pencil size={14} />
            Edit
          </button>
        </div>
      )}

      {isEditing && (
        <EditReviewModal
          isOpen={isEditing}
          initialRating={review.rating}
          initialComment={review.comment}
          onClose={() => setIsEditing(false)}
          onSave={(rating, comment) => {
            dispatch(
              updateReview({
                reviewId: review.id,
                rating,
                comment,
              }),
            );

            toast.success("Review updated");

            setIsEditing(false);
          }}
        />
      )}
    </motion.div>
  );
}
